const { exec } = require("child_process");
const $ = require("jquery");
const { loadDataFromStorage } = require("./helpers");
const { getBasePathProject } = require("./standartExec");
const { promisifyExec } = require("./helpers");

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

$(".mysql-demon-stop").click(() => {
  exec("service mysql stop");
});

$(".mysql-demon-start").click(() => {
  exec("service mysql start");
});

// Migration
$(".button-run-migration").click(async () => {
  try {
    const basePath = await getBasePathProject();
    const pm2FilePath = `${process.cwd()}/preparedFile/knexfile.js`;
    exec(`cp ${pm2FilePath} ${basePath}`);

    const data = await promisifyExec("knex migrate:latest");
    exec("redis-cli FLUSHALL");

    alert(data);
  } catch (error) {
    alert(error);
  }
});

$(".button-create-migration").click(async () => {
  try {
    const inputValMigration = $(".input-create-migration").val();

    const data = await promisifyExec(`knex migrate:make ${inputValMigration}`);

    alert(data);
  } catch (error) {
    alert(error);
  }
});

$(".button-create-migration-last-pop").click(async () => {
  try {
    const basePath = await getBasePathProject();
    const pm2FilePath = `${process.cwd()}/preparedFile/knexfile.js`;
    exec(`cp ${pm2FilePath} ${basePath}`);

    await promisifyExec("knex migrate:latest");
    exec("redis-cli FLUSHALL");
    await promisifyExec("node TOOLS/helpers/popLastMigration.js");

    alert("Complete");
  } catch (error) {
    alert(error);
  }
});

$(".button-sync-table").click(async () => {
  try {
    const basePath = await getBasePathProject();
    const pm2FilePath = `${process.cwd()}/preparedFile/sys_tables_temp.js`;
    exec(`cp ${pm2FilePath} ${basePath}`);

    alert("Complete");
  } catch (error) {
    alert(error);
  }
});

// Create module
$(".button-create-module").click(async () => {
  try {
    const basePath = await getBasePathProject();

    alert("In development");
  } catch (error) {
    alert(error);
  }
});

// Create extension
$(".button-extension-module").click(async () => {
  try {
    const basePath = await getBasePathProject();

    alert("In development");
  } catch (error) {
    alert(error);
  }
});

// Move pm2 config
$(".move-pm2-config-api").click(async () => {
  const basePath = await getBasePathProject();
  const pm2FilePath = `${process.cwd()}/preparedFile/api/ecosystem.config.js`;

  exec(`cp ${pm2FilePath} ${basePath}`);
});

$(".move-pm2-config-with-socket").click(async () => {
  const basePath = await getBasePathProject();
  const pm2FilePath = `${process.cwd()}/preparedFile/socket/ecosystem.config.js`;

  exec(`cp ${pm2FilePath} ${basePath}`);
});
