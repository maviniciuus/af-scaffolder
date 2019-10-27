'use strict';

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

var dateParser = require('./helpers/dateParser');
var stringHelper = require('./helpers/stringHelper');

var handleBars = {
	boot: function () {
		var handleBars = require('handlebars');
		handleBars.registerHelper('lowercase', stringHelper.lowercase);
		handleBars.registerHelper('uppercase', stringHelper.uppercase);
		handleBars.registerHelper('capitalize', stringHelper.capitalize);
		handleBars.registerHelper('pluralize_pt', stringHelper.pluralize_pt);
		handleBars.registerHelper('singulate_pt', stringHelper.singulate_pt);
		this.handleBars = handleBars;

		return this;
	},
	get_template_path: function (path, templatePath) {
		var template = path.substring(0, path.lastIndexOf('/')) + '/' + templatePath;

		if (path.indexOf('\\') !== -1) {
			template = path.substring(0, path.lastIndexOf('\\')) + '\\' + templatePath;
		}

		return template;
	},
	compile_template: function (template_string, template_context) {
		var template = this.boot().handleBars.compile(template_string);
		var d = new Date();

		var monthNames = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'];

		// console.log("compile_template=> template context: ", template_context.fields);
		return template(_extends({
			//date and time context
			mm: d.getMonth() + 1,
			dd: d.getDate(),
			yyyy: d.getFullYear(),
			monthNames: monthNames[d.getMonth()],
			date: dateParser.date(),
			datetime: dateParser.datetime(),
			time: dateParser.time()
		}, template_context));
	}
};

module.exports = handleBars;