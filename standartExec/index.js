const { promisifyExec } = require("../helpers");
const { FIRST_MIGRATION } = require("../constants");

module.exports.getBasePathProject = async () => {
  try {
    const data = await promisifyExec(`locate ${FIRST_MIGRATION}`);

    const BASE_PATH_PROJECT = data.replace(`migrations/${FIRST_MIGRATION}`, "");
    return BASE_PATH_PROJECT;
  } catch (error) {
    alert(error);
    return error;
  }
};
