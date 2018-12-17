var dateParser = require("./dateParser");
var stringHelper = require("./stringHelper");

var handleBars = {
  both: function() {
    var handleBars = require("handlebars");
    handleBars.registerHelper("lowercase", stringHelper.lowercase);
    handleBars.registerHelper("uppercase", stringHelper.uppercase);
    handleBars.registerHelper("capitalize", stringHelper.capitalize);
    this.handleBars = handleBars;

    return this;
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
  compile_template: function(template_string, template_context) {
    var template = this.both().handleBars.compile(template_string);
    var d = new Date();

    var monthNames = [
      "January",
      "February",
      "March",
      "April",
      "May",
      "June",
      "July",
      "August",
      "September",
      "October",
      "November",
      "December"
    ];

    return template({
      //date and time context
      mm: d.getMonth() + 1,
      dd: d.getDate(),
      yyyy: d.getFullYear(),
      monthNames: monthNames[d.getMonth()],
      date: dateParser.date(),
      datetime: dateParser.datetime(),
      time: dateParser.time(),
      //user arguments
      ...template_context
    });
  }
};

module.exports = handleBars;
