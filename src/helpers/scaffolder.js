var _ = require("lodash");
var fs = require("fs");
var Handlebars = require("handlebars");

var files = require("./files");
var errors = require("./errors");

var scaffolder = {
  boot: function(path, app) {
    this.path = path;

    if (files.exists(path)) {
      this.app = app;
      this.models = JSON.parse(files.get_contents(this.path));
      return this;
    }

    throw new Error(errors.model_not_found(path));
  },
  rename: function(string) {
    return string.replace("{{modulo_name}}", this.app);
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
  file_template: function(templatePath, data_context) {
    path = this.rename(this.path);
    templatePath = this.get_template_path(path, templatePath);

    if (files.exists(templatePath)) {
      var template = Handlebars.compile(files.get_contents(templatePath));
      return template({
        app_capitalize: this.app.replace(/^\w/, c => c.toUpperCase()),
        app_lower_case: this.app.toLowerCase()
      });
    }

    throw new Error(errors.template_not_found(templatePath));
  },
  touch_folder: function(path) {
    path = this.rename(path);
    if (!fs.existsSync(path)) fs.mkdirSync(path);
  },
  build: function(models, parentPath = ".") {
    models.map(function(model) {
      if (_.get(model, "children", []).length > 0) {
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
  magic: function(path, app) {
    this.boot(path, app).build(this.models);
  }
};

module.exports = scaffolder;
