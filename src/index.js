// const express = require('express');
// const bodyParser = require("body-parser");
// const cors = require("cors");
// const mysql2 = require('mysql2');
// port = 3000

// const app = express();
// app.use(bodyParser.json());
// app.use(cors());
// app.use(bodyParser.urlencoded({ extended: true }));

// app.use(function (req, res, next) {
//   res.header("Access-Control-Allow-Origin", "*");
//   res.header(
//     "Access-Control-Allow-Headers",
//     "Origin, X-Requested-With, Content-Type, Accept"
//   );
//   next();
// });



// //const  mysql2 = require('mysql2');

// const con = mysql2.createConnection({
//   host: "localhost",
//   user: "root",
//   password: "",
//   database: "test"
// });



// app.get("/", function (req, res,result) {
//   con.connect(function(err) {
//     if (err) throw err;
//     con.query("SELECT * FROM persons", function (err, result, fields) {
//       if (err) throw console.log(err);
//       console.log(result);
//       res.send(result);
//     });
//   });
// })

// app.post("/", function (req, res) {
//   con.connect(function(err) {
//     if (err) throw err;
//     x=req.body.name;
//     con.query("INSERT INTO persons (name) VALUES ('"+x+"')", function (err, result, fields) {
//       if (err) throw console.log(err);
//       console.log(result);
//       res.send(result);
//     });
//   });
// })

// app.listen(port, (req, res) => {
//   console.log(`Example app listening at http://localhost:${port}`);
// })


const express = require('express');
const bodyParser = require('body-parser');
const methodOverride = require('method-override');
const userController = require('./controllers/userController.js');
const cors = require("cors");
const dotenv = require("dotenv");


const app = express();


const userRoute = require('../src/routes/userRoute.js');



// Middleware
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.use(methodOverride('_method'));
app.use(cors());
dotenv.config();
app.use('/', userRoute);

app.use(function (req, res, next) {
  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
  next();
});

// Set view engine
// app.set('view engine', 'ejs');
// app.set('views', './src/views');
// Routes
//app.get('/users', userController.getUsers);
//app.get('/users/new', userController.newUserForm);
//app.post('/users', userController.createUser);
//app.get('/users/:id', userController.getUser);
//app.get('/users/:id/edit', userController.editUserForm);
//app.put('/users/:id', userController.updateUser);
//app.delete('/users/:id', userController.deleteUser);

// Start server
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
