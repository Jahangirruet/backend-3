const User = require('../models/userModel');

exports.getUsers = async (req, res) => {
  try {
    const users = await User.fetchAll();
    res.render('users/index', { users });
  } catch (err) {
    res.status(500).send('Server Error');
  }
};

exports.getUser = async (req, res) => {
  try {
    const user = await User.findById(req.params.id);
    res.render('users/show', { user });
  } catch (err) {
    res.status(500).send('Server Error');
  }
};

exports.newUserForm = (req, res) => {
  res.render('users/new');
};

exports.createUser = async (req, res) => {
  try {
    const { name } = req.body;
    await User.create(name);
    res.redirect('/users');
  } catch (err) {
    res.status(500).send('Server Error');
  }
};

exports.editUserForm = async (req, res) => {
  try {
    const user = await User.findById(req.params.id);
    res.render('users/edit', { user });
  } catch (err) {
    res.status(500).send('Server Error');
  }
};

exports.updateUser = async (req, res) => {
  try {
    const { name } = req.body;
    await User.update(req.params.id, name);
    res.redirect('/users');
  } catch (err) {
    res.status(500).send('Server Error');
  }
};

exports.deleteUser = async (req, res) => {
  try {
    await User.delete(req.params.id);
    res.redirect('/users');
  } catch (err) {
    res.status(500).send('Server Error');
  }
};
