"use strict";

var arrayExtractor = function (arrays) {
  var params = {};
  arrays.map(function (arr) {
    var argAndValue = arr.split(":");
    var parsedValue = argAndValue[1].split(",");
    params[argAndValue[0]] = parsedValue;
  });

  return params;
};

module.exports = arrayExtractor;