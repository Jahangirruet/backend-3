const db = require('./db.js');

class User {
  static async getAll(callback) {
    const sql = "SELECT * FROM person";
   db.query(sql, (err, results) => {
      if (err) throw err;
     callback(results);
    });
  }
  
  static async findById(ID, callback) {
    const sql = "SELECT * FROM person WHERE id = ?";
    db.query(sql, [ID], (err, results) => {
      if (err) throw err;
      if (typeof callback === 'function') {
        callback(results[0]);
      } else {
        console.error('callback is not a function');
      }
    });
  }
  

  static async create(name,callback) {
    const sql = "INSERT INTO person (name) VALUES (?)";
    db.query(sql, [name], (err, results) => {
      if (err) throw err;
      if (typeof callback === 'function') {
        callback(results.insertId);
      } else {
        console.error('callback is not a function');
      }
    });
  }

  static async update(id, name) {
    await db.execute('UPDATE person SET name = ? WHERE id = ?', [name, id]);
    return id;
  }

  static async delete(id) {
    await db.execute('DELETE FROM person WHERE id = ?', [id]);
  }
}

module.exports = User;
