const IP = require("../models/clients.js");

const clientController = {

    clinetList: (req, res) => {
        IP.getAll((clients) => {
            res.send(clients);
        });
    },
};

module.exports = clientController;