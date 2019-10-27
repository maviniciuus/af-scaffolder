let fs = require("fs");

let files = {
  exists: function(path) {
    return fs.existsSync(path);
  },
  get_contents: function(path, encoding = "utf8") {
    return fs.readFileSync(path, encoding);
  }
};

module.exports = files;
