const IP = require("../models/server.js");

const serverController = {

    serverList: (req, res) => {
        IP.getAll((servers) => {
            res.send(servers);
        });
    },
};

module.exports = serverController;