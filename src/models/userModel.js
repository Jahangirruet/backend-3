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
  

  static async create(first_name,last_name,address,callback) {
    const sql = "INSERT INTO users (first_name,last_name,address) VALUES (?,?,?)";
    db.query(sql, [first_name,last_name,address], (err, results) => {
      if (err) throw err;
      if (typeof callback === 'function') {
        callback(results.insertId);
      } else {
        console.error('callback is not a function');
      }
    });
  }

  static async update(id, first_name, last_name, address, callback) {
    await db.execute('UPDATE users SET first_name = ? ,last_name = ?, address = ? WHERE id = ?', [first_name, last_name, address, id]);
    return id;
  }

  static async delete(id) {
    await db.execute('DELETE FROM users WHERE id = ?', [id]);
  }
}

module.exports = User;
