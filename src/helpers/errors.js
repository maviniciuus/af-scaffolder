module.exports = {
  model_not_found: function(detail) {
    return `[ERR] - MODEL NOT FOUNT. PATH: [${detail}]`;
  },
  template_not_found: function(detail) {
    return `[ERR] - TEMPLATE NOT FOUNT. PATH: [${detail}]`;
  }
};
