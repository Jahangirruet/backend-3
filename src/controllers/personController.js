const express = require('express');
const bodyParser = require("body-parser");
const cors = require("cors");
//const mysql2 = require('mysql2');

const app = express();
app.use(bodyParser.json());
app.use(cors());
app.use(bodyParser.urlencoded({ extended: true }));

app.use(function (req, res, next) {
  res.header("Access-Control-Allow-Origin", "*");
  res.header(
    "Access-Control-Allow-Headers",
    "Origin, X-Requested-With, Content-Type, Accept"
  );
  next();
});

const Person = require('../models/personModel');

const personController = {
    crestePerson: (req, res) => {
        const name = req.body;
        console.log("name - ", name);
        Person.create(name, (result) => {
            res.send(result);
        }); 
    }

}
module.exports = personController;
