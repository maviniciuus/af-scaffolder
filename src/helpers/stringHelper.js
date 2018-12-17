var stringHelper = {
	lowercase: function(str) {
		return str ? str.toLowerCase() : str;
	},
	uppercase: function(str) {
		return str ? str.toUpperCase() : str;
	},
	capitalize: function(str) {
		return str ? str.replace(/^\w/, c => c.toUpperCase()) : str;
	},
	pluralize_exceptions_pt: function() {
		return {
			cidadão: 'cidadões',
			mão: 'mãos',
			qualquer: 'quaisquer',
		};
	},
	pluralize_rules_pt: function() {
		return {
			ão: 'ões',
			ao: 'oes',
			ês: 'eses',
			es: 'eses',
			m: 'ns',
			l: 'is',
			r: 'res',
			us: 'i',
			x: 'xes',
			z: 'zes',
		};
	},
	pluralize_pt: function(string = '') {
		string = string.toLowerCase();

		// dont need to pluralize
		if (/(s|ões|eses|ns|is|res|xes|zes|ãos)$/.test(string)) {
			return string;
		}

		// belong to any exceptions?
		if (Object.keys(stringHelper.pluralize_exceptions_pt()).indexOf(string) !== -1) {
			return stringHelper.pluralize_exceptions_pt()[string];
		}

		// does not belong to any exception. But have any rules?
		var ruleCaseResult = '';
		Object.keys(stringHelper.pluralize_rules_pt()).map(function(rule) {
			var regex = new RegExp(rule + '$');
			if (regex.test(string)) {
				ruleCaseResult = string.replace(regex, stringHelper.pluralize_rules_pt()[rule]);
			}
		});
		if (ruleCaseResult) return ruleCaseResult;

		// does not belong to any exceptions nor rules
		return string + 's';
	},
	singulate_exceptions_pt: function() {
		return {
			cidadões: 'cidadão',
			mãos: 'mão',
			quaisquer: 'qualquer',
		};
	},
	singulate_rules_pt: function() {
		return {
			ões: 'ão',
			oes: 'ao',
			eses: 'ês',
			ns: 'm',
			is: 'l',
			res: 'r',
			i: 'us',
			xes: 'x',
			zes: 'z',
		};
	},
	singulate_pt: function(string = '') {
		string = string.toLowerCase();

		// belong to any exceptions?
		if (Object.keys(stringHelper.singulate_exceptions_pt()).indexOf(string) !== -1) {
			// console.log('singulate_pt=> has exception: ', string, stringHelper.singulate_exceptions_pt()[string]);
			return stringHelper.singulate_exceptions_pt()[string];
		}

		// does not belong to any exception. But have any rules?
		var ruleCaseResult = '';
		Object.keys(stringHelper.singulate_rules_pt()).map(function(rule) {
			var regex = new RegExp(rule + '$');
			if (regex.test(string)) {
				ruleCaseResult = string.replace(regex, stringHelper.singulate_rules_pt()[rule]);
			}
		});
		if (ruleCaseResult) {
			// console.log('singulate_pt=> has rule: ', string, ruleCaseResult);
			return ruleCaseResult;
		}

		// does not belong to any exceptions or rules, do nothing
		// console.log('singulate_pt=> do nothing: ', string, string);
		return string;
	},
};

module.exports = stringHelper;
