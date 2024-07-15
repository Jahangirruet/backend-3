const express = require("express");
const app = express();

const bodyParser = require("body-parser");
const cors = require("cors");
const dotenv = require("dotenv");

dotenv.config();

const userRoute = require('../src/routes/userRoute.js');


const PORT = process.env.PORT;

app.use(cors());
app.use('/', userRoute);
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

app.use(function (req, res, next) {
  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
  next();
});

app.listen(PORT, () => {
  console.log(`Example app listening at http://localhost:${PORT}/users`);
});

//



