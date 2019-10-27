let arrayExtractor = function(arrays) {
  let params = {};
  arrays.map(function(arr) {
    let argAndValue = arr.split(":");
    let parsedValue = argAndValue[1].split(",");
    params[argAndValue[0]] = parsedValue;
  });

  return params;
};

module.exports = arrayExtractor;
