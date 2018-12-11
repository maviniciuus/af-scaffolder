var fs = require("fs");

var files = {
  exists: function (path) {
    return fs.existsSync(path);
  },
  get_contents: function(path, encoding = "utf8") {
    return fs.readFileSync(path, encoding);
  },
  toCapitalize: function(string){
    return string.replace(/^\w/, c => c.toUpperCase())
  }
}

module.exports = files;
