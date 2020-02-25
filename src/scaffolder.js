const lodashGet = require('lodash').get;
const fs = require('fs');
const handleBars = require('./handleBars');
const errors = require('./helpers/errors');
const files = require('./helpers/files');

const defaultArgs = ['_', 's', 'm', 'n', 'a'];
const scaffolder = {
  boot(schemePath, app, argv = {}) {
    this.schemePath = schemePath;

    if (files.exists(this.schemePath)) {
      this.pack_name = app;
      this.models = JSON.parse(files.get_contents(schemePath));
      this.arguments = this.parseArguments(argv);
      return this;
    }

    throw new Error(errors.model_not_found(schemePath));
  },
  parseArguments(args) {
    const auxArgs = { ...args, pack_name: this.pack_name };
    // console.log('parseArguments=> input:', args);

    Object.keys(args).forEach((prop) => {
      // arguments after "-a", becomes an array with af-scaffolder array parser
      // Ex.: -a fieldName:field1,field2,field3,field4.
      // Results: "fieldName" at template_context,
      // value is an array like ["field1", "field2", "field3", "field4"].
      if (prop === 'a') {
        // input need to be an array
        if (!Array.isArray(auxArgs[prop])) auxArgs[prop] = [auxArgs[prop]];

        auxArgs[prop].forEach((param) => {
          const auxSplit = param.split(':');
          const auxProp = auxSplit[0];
          auxArgs[auxProp] = auxSplit[1].trim().split(',');
        });
      }

      // json parser
      if (prop === 'j') {
        // input need to be string
        if (typeof auxArgs[prop] === 'string') {
          auxArgs[prop] = JSON.parse(auxArgs[prop]);
        }
      }

      // I remove reserved LIB's from the template context.
      // This prevents templates from consuming these properties,
      // which should change according to the evolution of LIB,
      // without breaking their templates when updating the tool.
      if (defaultArgs.indexOf(prop) !== -1) {
        delete auxArgs[prop];
      }
    });

    // console.log('parseArguments=> result:', auxArgs);
    return auxArgs;
  },
  rename(string) {
    return handleBars.compileTemplate(string, this.arguments);
  },
  touchFile(path, template = '') {
    let content = '';
    const auxPath = scaffolder.rename(path);

    if (template) {
      content = scaffolder.file_template(template);
    }

    if (!fs.existsSync(auxPath)) fs.writeFileSync(auxPath, content);
  },
  file_template(templatePath) {
    const auxTemplatePath = handleBars.getTemplatePath(this.schemePath, templatePath);

    if (files.exists(auxTemplatePath)) {
      return handleBars.compileTemplate(files.get_contents(auxTemplatePath), this.arguments);
    }

    throw new Error(errors.template_not_found(templatePath));
  },
  touch_folder(path) {
    // eslint-disable-next-line no-param-reassign
    const auxPath = this.rename(path);
    if (!fs.existsSync(auxPath)) fs.mkdirSync(auxPath);
  },
  build(models, parentPath = '.') {
    models.forEach((model) => {
      if (lodashGet(model, 'children', []).length > 0) {
        scaffolder.touch_folder(`${parentPath}/${model.name}`);
        scaffolder.build(model.children, `${parentPath}/${scaffolder.rename(model.name)}`);
      } else {
        scaffolder.touchFile(`${parentPath}/${model.name}`, model.template);
      }
    });

    return this;
  },
  magic(path, app, args) {
    this.boot(path, app, args).build(this.models);
  },
};

module.exports = scaffolder;
