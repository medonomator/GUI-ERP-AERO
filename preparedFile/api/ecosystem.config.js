module.exports = {
    /**
     * Application configuration section
     * http://pm2.keymetrics.io/docs/usage/application-declaration/
     */
    apps: [
        // API
        {
            name: "API",
            script: "bin/www",
            // exec_mode: "cluster",
            // instances: "max",
            watch: true,
            // pmx: false,
            env: {
                NODE_PATH: ".",
                NODE_ENV: "development_dmitriy",
                NODE_DEBUG: 1
            },
            ignore_watch: ["node_modules", "config", "logs"],
        },
        // {
        //     name: "SOCKETv2",
        //     script: "ws_router2.js",
        //     watch: true,
        //     // pmx: false,
        //     env: {
        //         NODE_PATH: ".",
        //         NODE_ENV: "development_dmitriy",
        //         NODE_DEBUG: 1
        //     },
        //     ignore_watch: ["node_modules", "config", "logs"],
        // },
        // {
        //     name: "SOCKET Worker",
        //     script: "ws_worker2.js",
        //     // instances: "max",
        //     // exec_mode: "fork_mode",
        //     watch: true,
        //     // pmx: false,
        //     env: {
        //         NODE_PATH: ".",
        //         NODE_ENV: "development_dmitriy",
        //         NODE_DEBUG: 1
        //     },
        //     ignore_watch: ["node_modules", "config", "logs"],
        // },
        // {
        //     name: 'Queues',
        //     script: 'modules/queues.js',
        //     watch: false,
        //     pmx: false
        // },
        // {
        //     name: 'Cron',
        //     script: 'modules/cron.js',
        //     watch: false,
        //     pmx: false
        // }
    ],
};
