var _get = require("lodash").get;
var fs = require("fs");
var handleBars = require("./helpers/handleBars");

var stringHelper = require("./helpers/stringHelper");
var files = require("./helpers/files");
var errors = require("./helpers/errors");

var defaultArgs = ["_", "s", "m", "n"];

var scaffolder = {
  boot: function(scheme_path, app, argv = {}) {
    this.scheme_path = scheme_path;

    if (files.exists(this.scheme_path)) {
      this.pack_name = app;
      this.models = JSON.parse(files.get_contents(this.scheme_path));
      this.arguments = this.parse_arguments(argv);
      return this;
    }

    throw new Error(errors.model_not_found(path));
  },
  parse_arguments: function(args) {
    var auxArgs = { ...args, pack_name: this.pack_name };

    Object.keys(args).map(function(prop) {
      if (defaultArgs.indexOf(prop) !== -1) {
        delete auxArgs[prop];
      }
    });

    return auxArgs;
  },
  rename: function(string) {
    return handleBars.compile_template(string, this.arguments);
  },
  touch_file: function(path, template = "") {
    path = scaffolder.rename(path);

    var content = "";
    if (template) {
      var fileTemplate = scaffolder.file_template(template);
      content = fileTemplate;
    }

    if (!fs.existsSync(path)) fs.writeFileSync(path, content);
  },
  file_template: function(template_path) {
    template_path = handleBars.get_template_path(
      this.scheme_path,
      template_path
    );

    if (files.exists(template_path)) {
      return handleBars.compile_template(
        files.get_contents(template_path),
        this.arguments
      );
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
