const $ = require("jquery");
const { exec } = require("child_process");

module.exports.loadDataFromStorage = () => {
  if (localStorage.getItem("sanbox-input-1")) {
    $("#input-sandbox-1").val(localStorage.getItem("sanbox-input-1"));
  }
};

module.exports.promisifyExec = (command) =>
  new Promise((resolve, reject) => {
    exec(command, { cwd: '/home/socket/erp-engine' }, (error, stdout, stderr) => {
      if (error) reject(error);
      if (stderr) reject(stderr);
      resolve(stdout);
    });
  });
  