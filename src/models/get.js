const db = require('./db.js');

const User = {
  getAll: (callback) => {
    const sql = "SELECT * FROM persons";
    db.query(sql, (err, results) => {
      if (err) throw err;
      callback(results);
    });
  },

  getById: (PersonID, callback) => {
    const sql = 'SELECT * FROM persons WHERE PersonID = ?';
    db.query(sql, [PersonID], (err, results) => {
        if (err) throw err;
        callback(results[0]);
    });
},

create: (user, callback) => {
  const sql = 'INSERT INTO users SET ?';
  db.query(sql, user, (err, results) => {
      if (err) throw err;
      callback(results.PersonID);
  });
},

}
module.exports = User


