const User = require("../models/get.js");

const userController = {
  list: (req, res) => {
    User.getAll((users) => {
      res.send(users);
    });
  },

  show: (req, res) => {
    const PersonID = req.params.PersonID;
    User.getById(PersonID,(user) => {
        res.send(PersonID);
    });
  },
};

  create: (req, res) => {
   const newUser = req.body;
    User.create(newUser, (id) => {
      res.redirect(`/users/${id}`);
   });
},

module.exports = userController;
