let dateParser = {
  date: function() {
    let currentDt = new Date();
    let mm = currentDt.getMonth() + 1;
    let dd = currentDt.getDate();
    let yyyy = currentDt.getFullYear();
    let date = mm + "/" + dd + "/" + yyyy;
    return date;
  },
  datetime: function getFormattedDate() {
    let d = new Date();
    return (
      d.getFullYear() +
      "-" +
      (d.getMonth() + 1) +
      "-" +
      d.getDate() +
      " " +
      d.getHours() +
      ":" +
      d.getMinutes() +
      ":" +
      d.getSeconds()
    );
  },
  time: function getFormattedDate() {
    let d = new Date();
    return d.getHours() + ":" + d.getMinutes() + ":" + d.getSeconds();
  }
};

module.exports = dateParser;
