// const User = require("../models/get.js");

// const userController = {
//   list: (req, res) => {
//     User.getAll((users) => {
//       res.send(users);
//     });
//   },

//   show: (req, res) => {
//     const id = req.params.id;
//     User.getById(id, (user) => {
//       res.send(user);
//     });
//   },

//   createUser: (req, res) => {

//     const user = { name: req.body };
//     console.log("user - ", user);
//     console.log("user.name -" , req.params);

//     User.create(user.name, (result) => {
//       res.send(result);
//     });
//   },
// };

// module.exports = userController;

const User = require("../models/userModel.js");

exports.getUsers = async (req, res) => {
  try {
    User.getAll((users) => {
      res.send(users);
      //res.redirect("/users");
    });
  } catch (err) {
    res.status(500).send("Server Error");
  }
};

exports.getUser = async (req, res) => {
  try {
    const user = await User.findById(req.params.id, (user) => {
      res.send(user);
    });
  } catch (err) {
    res.status(500).send("Server Error");
  }
};

exports.newUserForm = (req, res) => {
  res.render("users/new");
};

exports.createUser = async (req, res) => {
  try {
    //const { name } = req.body;
    const user = await User.create(req.body.name, (result) => {
      res.send("user added");
    });
  } catch (err) {
    res.status(500).send("Server Error");
  }
};

exports.editUserForm = async (req, res) => {
  try {
    const user = await User.findById(req.params.id);
    res.render("users/edit", { user });
  } catch (err) {
    res.status(500).send("Server Error");
  }
};

exports.updateUser = async (req, res) => {
  try {
    const { name } = req.body;
    await User.update(req.params.id, name);
    res.send(name);
  } catch (err) {
    res.status(500).send("Server Error");
  }
};

exports.deleteUser = async (req, res) => {
  try {
    await User.delete(req.params.id);
    res.send("User deleted successfully");
    //res.redirect("/users");
  } catch (err) {
    res.status(500).send("Server Error");
  }
};
