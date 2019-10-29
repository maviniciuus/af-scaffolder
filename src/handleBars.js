const { Strings } = require('af-helpers');
const handlebars = require('handlebars');
const dateParser = require('./helpers/dateParser');

const handleBars = {
  boot() {
    handlebars.registerHelper('lowercase', Strings.lowercase);
    handlebars.registerHelper('uppercase', Strings.uppercase);
    handlebars.registerHelper('capitalize', Strings.capitalize);
    handlebars.registerHelper('snakeize', Strings.snakeize);
    handlebars.registerHelper('pluralize_pt', Strings.pluralizePt);
    handlebars.registerHelper('singulate_pt', Strings.singulatePt);
    this.handlebars = handlebars;

    return this;
  },
  getTemplatePath(path, templatePath) {
    let template = `${path.substring(0, path.lastIndexOf('/'))}/${templatePath}`;

    if (path.indexOf('\\') !== -1) {
      template = `${path.substring(0, path.lastIndexOf('\\'))}\\${templatePath}`;
    }

    return template;
  },
  compileTemplate(templateString, templateContext) {
    const template = this.boot().handlebars.compile(templateString);
    const d = new Date();

    const monthNames = [
      'January',
      'February',
      'March',
      'April',
      'May',
      'June',
      'July',
      'August',
      'September',
      'October',
      'November',
      'December',
    ];

    // console.log("compileTemplate=> template context: ", templateContext.fields);
    return template({
      // date and time context
      mm: d.getMonth() + 1,
      dd: d.getDate(),
      yyyy: d.getFullYear(),
      monthNames: monthNames[d.getMonth()],
      date: dateParser.date(),
      datetime: dateParser.datetime(),
      time: dateParser.time(),
      // user arguments
      ...templateContext,
    });
  },
};

module.exports = handleBars;
