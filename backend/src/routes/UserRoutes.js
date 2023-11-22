const express = require('express');
const router = express.Router();
const UserController = require('../controllers/UserController');

router.get('/', UserController.getAllUsers);
router.get('/:id', UserController.getUserById);

router.put('/:id/list/create', UserController.createNewList);
router.get('/:id/list', UserController.getAllLists);

module.exports = router;
