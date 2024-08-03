const db = require('./db.js');


class Ip {
    static async getAll(callback) {
        const sql = "SELECT * FROM ip";
        db.query(sql, (err, results) => {
            if (err) throw err;
            callback(results);
        });
    }
  
    
}

module.exports = Ip;