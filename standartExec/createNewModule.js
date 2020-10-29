const { getBasePathProject } = require("../standartExec");
const { promises } = require("fs");
const { templateModule } = require("./templates/module");

const createNewModule = async (moduleName) => {
  moduleName = "PartTransfer";
  try {
    const basePath = await getBasePathProject();

    await promises.writeFile(
      `${basePath}libs/class/generator/module${moduleName}.js`,
      templateModule(moduleName)
    );
  } catch (error) {
    alert(error);
  }
};

module.exports.createNewModule = createNewModule;
