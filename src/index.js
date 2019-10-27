#!/usr/bin/env node
const lodashGet = require('lodash').get;
const minimist = require('minimist');
const scaffolder = require('./scaffolder');

// s = schemaPath - n or m = are the same, name of new module
const argv = minimist(process.argv.slice(2));

scaffolder.magic(lodashGet(argv, 's'), lodashGet(argv, 'n'), argv);
