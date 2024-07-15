const User = require('../models/userModel.js');

const userController2 = {
  createUser: async (req, res) => {
    try {
      const { name  } = req.body.name;
      const result = await User.create({ name  });
      res.status(201).json({ message: 'User created successfully' });
    } catch (error) {
      res.status(500).json({ error: 'Failed to create user' });
      
    }
  }
};

module.exports = userController2;
