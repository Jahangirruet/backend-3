const db = require("./db.js");

class clientsList {
    static async getAll(callback) {
        const sql = "SELECT * FROM clients";
        db.query(sql, (err, results) => {
            if (err) throw err;
            callback(results);
        });
    }
}

module.exports = clientsList;