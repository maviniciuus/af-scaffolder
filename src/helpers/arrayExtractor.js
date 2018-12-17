var arrayExtractor = function(arrays) {
  var arguments = {};
  arrays.map(function(arr) {
    var argAndValue = arr.split(":");
    var parsedValue = argAndValue[1].split(",");
    arguments[argAndValue[0]] = parsedValue;
  });

  return arguments;
};

module.exports = arrayExtractor;
