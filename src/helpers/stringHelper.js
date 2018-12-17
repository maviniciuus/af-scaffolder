var stringHelper = {
  check_invalid: function(str) {
    if (typeof str !== "string") {
      console.log("invalidstring", str);
    }
  },
  lowercase: function(str) {
    stringHelper.check_invalid(str);
    return str ? str.toLowerCase() : str;
  },
  upercase: function(str) {
    stringHelper.check_invalid(str);
    return str ? str.toUpperCase() : str;
  },
  capitalize: function(str) {
    stringHelper.check_invalid(str);
    return str ? str.replace(/^\w/, c => c.toUpperCase()) : str;
  }
};

module.exports = stringHelper;
