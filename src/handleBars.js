let dateParser = require('./helpers/dateParser');
let stringHelper = require('./helpers/stringHelper');

let handleBars = {
	boot: function() {
		let handleBars = require('handlebars');
		handleBars.registerHelper('lowercase', stringHelper.lowercase);
		handleBars.registerHelper('uppercase', stringHelper.uppercase);
		handleBars.registerHelper('capitalize', stringHelper.capitalize);
		handleBars.registerHelper('pluralize_pt', stringHelper.pluralize_pt);
		handleBars.registerHelper('singulate_pt', stringHelper.singulate_pt);
		this.handleBars = handleBars;

		return this;
	},
	get_template_path: function(path, templatePath) {
		let template = path.substring(0, path.lastIndexOf('/')) + '/' + templatePath;

		if (path.indexOf('\\') !== -1) {
			template = path.substring(0, path.lastIndexOf('\\')) + '\\' + templatePath;
		}

		return template;
	},
	compile_template: function(template_string, template_context) {
		let template = this.boot().handleBars.compile(template_string);
		let d = new Date();

		let monthNames = [
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

		// console.log("compile_template=> template context: ", template_context.fields);
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
			...template_context,
		});
	},
};

module.exports = handleBars;
