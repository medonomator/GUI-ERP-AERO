const { ipcRenderer } = require("electron");
const { exec } = require("child_process");
const $ = require("jquery");
const { loadDataFromStorage } = require("./helpers");

loadDataFromStorage();

$(".button-sandbox-1").click(() => {
  const val = $("#input-sandbox-1").val();
  localStorage.setItem("sanbox-input-1", val);

  const command = `ssh -N -L 3306:localhost:3306 centos@${val} -i /home/socket/.ssh/stockholm.pem`;
  exec(command, (error, stdout, stderr) => {
    if (error) {
      new Notification("Sandbox-1 Closed").show();
      return;
    }
  });

  new Notification("Sandbox-1 Connected").show();
});

$(".button-sandbox-1-close").click(() => {
  exec("pidof -s ssh", (error, stdout, stderr) => {
    const command = `kill -9 ${stdout}`;
    exec(command);
  });
});
