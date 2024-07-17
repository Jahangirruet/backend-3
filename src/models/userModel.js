const db = require('./db.js');

class User {
  static async getAll(callback) {
    const sql = "SELECT * FROM users";
   db.query(sql, (err, results) => {
      if (err) throw err;
     callback(results);
    });
  }
  
  static async findById(ID, callback) {
    const sql = "SELECT * FROM users WHERE id = ?";
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
    const sql = "INSERT INTO users (name) VALUES (?)";
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
    await db.execute('UPDATE users SET name = ? WHERE id = ?', [name, id]);
    return id;
  }

  static async delete(id) {
    await db.execute('DELETE FROM users WHERE id = ?', [id]);
  }
}

module.exports = User;
