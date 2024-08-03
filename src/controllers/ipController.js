const IP = require("../models/ip.js");

const ipController = {

    ipList: (req, res) => {
        IP.getAll((ips) => {
            res.send(ips);
        });
    },
 
};

module.exports = ipController;