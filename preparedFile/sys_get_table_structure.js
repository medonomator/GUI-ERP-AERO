var config = require('config');
var process = require('process');
var fs = require('fs');
var async = require('async');
var mysql = require('mysql');


var connection = mysql.createConnection({ "host": "localhost", "user": "apps", "password": "1234", "database": "crmtst_baieu" });

connection.connect(function (err) {
    if (err) {
        console.error('error connecting: ' + err.stack);
        return;
    }

    console.log('connected as id ' + connection.threadId);
    let where = "";

    if (!process.argv[2]) {
        console.log('NODE_TABLE not set');
    } else {
        where = " and table_name = '"+process.argv[2]+"' "
    }

    connection.query("SELECT table_name FROM information_schema.tables where table_schema='crmtst_baieu' " + where, (err, data) => {
        if (err) {
            console.error(err)
            process.exit(0);
        } else {
            if (data.length > 0) {

                console.log("Loaded: " + data.length)

                async.each(data, function (table, cd) {

                    table = table.table_name;

                    if ((table.indexOf("view_") == 0 || table.indexOf("crm_") == 0 || table.indexOf('vtiger_') == 0 || table.indexOf('its4you_') == 0) && (table.indexOf("_seq") == -1 || table.indexOf("crm_sequences") != -1 || table.indexOf('vtiger_crmentity_seq') != -1)) {
                        // normal table
                        let structure = {
                            table: "",
                            columns: {}
                        }

                        connection.query("SHOW COLUMNS FROM " + table, (err, res) => {
                            if (err) {
                                cd(err);
                            } else {

                                let file = "" +
                                    "let " + table + " = {" +
                                    "table : '" + table + "'," +
                                    "columns : {";

                                for (var i in res) {


                                    file += res[i].Field + " : '" + table + "." + res[i].Field + "',"


                                }

                                file += "}" +
                                    "}\n\n" +
                                    "module.exports = " + table + ";";



                                // save file
                                fs.writeFileSync("tables/" + table + ".js", file);
                                cd();
                            }
                        })

                    } else {
                        // other table
                        console.log("other: " + table);
                        cd();
                    }

                }, (err) => {
                    console.log(err)
                    console.log('All tables created')
                    process.exit(0);
                })

            } else {
                console.log('DB empty');
                process.exit(0)
            }
        }
    })
});