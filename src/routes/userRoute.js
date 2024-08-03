const express = require('express');
const router = express.Router();


const userController = require('../controllers/userController.js');
const ipController = require('../controllers/ipController.js');
const clientController = require('../controllers/clientController.js');
const serverController = require('../controllers/serverController.js');



router.get('/users', userController.getUsers);
router.get('/users/:id', userController.getUser);
router.post('/users', userController.createUser);
router.put('/users/:id', userController.updateUser);
router.delete('/users/:id', userController.deleteUser);

router.get('/ip', ipController.ipList);
router.get('/server', serverController.serverList);
router.get('/client', clientController.clinetList);







module.exports = router;
