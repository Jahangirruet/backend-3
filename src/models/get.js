const userController = require("../controllers/userController.js");
//const { x } = require("../controllers/usercontroller.js");
const db = require("./db.js");

const User = {
  getAll: (callback) => {
    const sql = "SELECT * FROM persons";
    db.query(sql, (err, results) => {
      if (err) throw err;
      callback(results);
    });
  },

  getById: (ID, callback) => {
    const sql = "SELECT * FROM persons WHERE id = ?";
    db.query(sql, [ID], (err, results) => {
      if (err) throw err;
      callback(results[0]);
    });
  },

  create: (user, callback) => {
    const sql = "INSERT INTO persons (name) VALUES ('" + user + "');";
    db.query(sql, [user], (err, results) => {
      if (err) {
        console.error(err);
        return callback(err, null);
      }
      callback(null, results);
      console.log(results);
    });
  }

};
module.exports = User;
