const express = require('express');
const router = express.Router();
const userController = require('../controllers/usercontroller.js');

router.get('/users', userController.list);
router.get('/users/:PersonID', userController.show);
router.post('/users/', userController.create);

module.exports = router;
