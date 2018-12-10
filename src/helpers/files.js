var fs = require("fs");
var errors = require("./errors");

function exists(path) {
  return fs.existsSync(path);
}

function get_contents(path, encoding = "utf8") {
  return fs.readFileSync(path, encoding);
}

module.exports = {
  exists,
  get_contents
};
