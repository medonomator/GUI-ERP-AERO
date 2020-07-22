const $ = require("jquery");

module.exports.loadDataFromStorage = () => {
  if (localStorage.getItem("sanbox-input-1")) {
    $("#input-sandbox-1").val(localStorage.getItem("sanbox-input-1"));
  }
};
