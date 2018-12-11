#!/usr/bin/env node
var _get = require("lodash").get;
var scaffolder = require("./helpers/scaffolder");

var argv = require("minimist")(process.argv.slice(2));
//s = schemaPath - n or m = are the same, name of new module
scaffolder.magic(_get(argv, "s"), _get(argv, "n", _get(argv, "m")));
