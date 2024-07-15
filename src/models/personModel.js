const db = require("./db.js");

const postcontroller = {
    create: (post, callback) => {
        
        const sql = "INSERT INTO persons (name) VALUES (?)";
        db.query("INSERT INTO persons (name) VALUES ('"+post+"')", function (err, result, fields) {
            if (err) throw console.log(err);
            console.log(result);
            callback(result);
          });
    },   
};
module.exports = postcontroller;