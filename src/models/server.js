const db = require('./db.js');

class Server {

    static async getAll(callback) {
        const sql = "SELECT * FROM servers";
        db.query(sql, (err, results) => {
            if (err) throw err;
            callback(results);
        });
}

}

module.exports = Server;