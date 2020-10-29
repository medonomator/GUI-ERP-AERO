const { promisifyExec } = require("../helpers");
const { FIRST_MIGRATION } = require("../constants");

module.exports.getBasePathProject = async () => {
  try {
    let data = await promisifyExec(`locate ${FIRST_MIGRATION}`);
    const BASE_PATH_PROJECT = data.slice(0, -45);
    return BASE_PATH_PROJECT;
  } catch (error) {
    alert(error);
    return error;
  }
};
