const express = require('express');
const bodyParser = require("body-parser");
const cors = require("cors");
port = 3000

const app = express();
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

app.use(function (req, res, next) {
  res.header("Access-Control-Allow-Origin", "*");
  res.header(
    "Access-Control-Allow-Headers",
    "Origin, X-Requested-With, Content-Type, Accept"
  );
  next();
});



const  mysql = require('mysql2');

const con = mysql.createConnection({
  host: "localhost",
  user: "root",
  password: "",
  database: "test"
});



app.get("/", function (req, res,result) {
  con.connect(function(err) {
    if (err) throw err;
    con.query("SELECT * FROM customers", function (err, result, fields) {
      if (err) throw err;
      console.log(result);
      res.send(result);
    });
  });
})

app.listen(port, (req, res) => {
  console.log(`Example app listening at http://localhost:${port}`);
})
