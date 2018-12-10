var _get = require("lodash").get;
var scaffolder = require("./helpers/scaffolder");

var argv = require("minimist")(process.argv.slice(2));
scaffolder.magic(_get(argv, "s"), _get(argv, "m"));
