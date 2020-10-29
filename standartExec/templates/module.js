const { snakeCase } = require("lodash");

module.exports.templateModule = (
  nameModule
) => `const Module = require("libs/class/generator/module");
const FieldEditClass = require("libs/class/fieldEdit");
const helper = require("libs/helper");
const libApi = require("libs/api");
const moduleModel = require("models/module");
const vtiger_${snakeCase(nameModule)} = require("tables/vtiger_${snakeCase(
  nameModule
)}");

class ${nameModule} extends Module {
    constructor(options = {}) {
        helper.set(options, "name", moduleModel.CONST_MODULE_${snakeCase(
          nameModule
        ).toUpperCase()});
        helper.set(options, "table", vtiger_${snakeCase(nameModule)}.table);
        helper.set(options, "tableIdColumn", libApi.getTableColumn(vtiger_${snakeCase(
          nameModule
        )}.columns.id));
        super(options);
    }

    setFieldEditClass(req, crm_id, line_id, user_id, asyncObj) {
        this._fieldEdit = new FieldEditClass(vtiger_${snakeCase(
          nameModule
        )}.table, vtiger_${snakeCase(
  nameModule
)}.columns.id, crm_id, line_id, user_id);
        this._fieldEdit.setRequest(req);
        this._fieldEdit.setQBtable(vtiger_${snakeCase(
          nameModule
        )}.table, vtiger_${snakeCase(nameModule)}.columns.id);
        this._fieldEdit.setActivitiesList(asyncObj.activitiesList);
        this._fieldEdit.setDBConnection(asyncObj.connection);
    }
}

module.exports = ${nameModule};
`;
