const db = require('./db.js');

class Post {
  static async create(name) {
    const result = await db.execute('INSERT INTO posts (name) VALUES (?)', [name]);
    return result[0].insertId;
  }
}

module.exports = Post;
