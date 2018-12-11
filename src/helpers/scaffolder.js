var _get = require("lodash").get;
var fs = require("fs");
var Handlebars = require("handlebars");

var files = require("./files");
var errors = require("./errors");

var defaultArgs = ["_", "s", "m", "n"];

var scaffolder = {
  boot: function(path, app, argv = {}) {
    this.path = path;

    if (files.exists(path)) {
      this.app = app;
      this.models = JSON.parse(files.get_contents(this.path));
      this.arguments = this.parse_arguments(argv);
      return this;
    }

    throw new Error(errors.model_not_found(path));
  },
  parse_arguments: function(args) {
    var auxArgs = args;
    Object.keys(args).map(function(prop) {
      if (defaultArgs.indexOf(prop) !== -1) {
        delete auxArgs[prop];
      }
    });
    return auxArgs;
  },
  rename: function(string) {
    string = string.replace("{{name_upper}}", this.app.toUpperCase());
    string = string.replace("{{name_lower}}", this.app.toLowerCase());
    string = string.replace(
      "{{name_capitalize}}",
      files.toCapitalize(this.app)
    );

    return string;
  },
  touch_file: function(path, template = "") {
    path = this.rename(path);

    var content = "";
    if (template) {
      content = scaffolder.file_template(template);
    }

    if (!fs.existsSync(path)) fs.writeFileSync(path, content);
  },
  get_template_path: function(path, templatePath) {
    var template =
      path.substring(0, path.lastIndexOf("/")) + "/" + templatePath;
    if (path.indexOf("\\") !== -1) {
      template =
        path.substring(0, path.lastIndexOf("\\")) + "\\" + templatePath;
    }

    return template;
  },
  file_template: function(template_path) {
    path = this.rename(this.path);
    template_path = this.get_template_path(path, template_path);

    if (files.exists(template_path)) {
      var template = Handlebars.compile(files.get_contents(template_path));
      return template({
        app_capitalize: files.toCapitalize(this.app),
        app_upper_case: this.app.toUpperCase(),
        app_lower_case: this.app.toLowerCase(),
        date: new Date().toDateString(),
        ...this.arguments
      });
    }

    throw new Error(errors.template_not_found(template_path));
  },
  touch_folder: function(path) {
    path = this.rename(path);
    if (!fs.existsSync(path)) fs.mkdirSync(path);
  },
  build: function(models, parentPath = ".") {
    models.map(function(model) {
      if (_get(model, "children", []).length > 0) {
        scaffolder.touch_folder(`${parentPath}/${model.name}`);
        scaffolder.build(
          model.children,
          `${parentPath}/${scaffolder.rename(model.name)}`
        );
      } else {
        scaffolder.touch_file(`${parentPath}/${model.name}`, model.template);
      }
    });

    return this;
  },
  magic: function(path, app, args) {
    this.boot(path, app, args).build(this.models);
  }
};

module.exports = scaffolder;
