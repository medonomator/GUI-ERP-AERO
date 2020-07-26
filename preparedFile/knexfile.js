var config = require('config');
var process = require('process');
// Update with your config settings.
process.env.NODE_COMPANY = 'BAI'
if (!process.env.NODE_COMPANY) {
    console.log('NODE_COMPANY not set');
    process.exit(0);
}

module.exports = {

    development: {
        client: 'mysql',
        connection: { host: "localhost", user: "apps", password: "Welcome2020!", database: "baieu" },
        pool: {
            min: 2,
            max: 10,
            requestTimeout: 10000
        },
        migrations: {
            tableName: 'bai_engine_migrations'
        }
    },
    development_v3: {
        client: 'mysql',
        connection: config.get('companies.' + process.env.NODE_COMPANY + '.mysqlPoolCluster.master'),
        pool: {
            min: 2,
            max: 10,
            requestTimeout: 10000
        },
        migrations: {
            tableName: 'bai_engine_migrations'
        }
    }
};