const express = require('express');
const router = express.Router();
const UserController = require('../controllers/UserController');

// router.get('/', UserController.getAllUsers);
// router.get('/:id', UserController.getUserById);
router.get('/', UserController.getUserBySession);

router.put('/list/create', UserController.createNewList);
router.get('/list', UserController.getAllLists);
router.get('/list/:list_id', UserController.getListById);
router.put('/list/:list_id/rename', UserController.renameList);
router.delete('/list/:list_id/delete', UserController.deleteList);

router.put('/list/:list_id/item/create', UserController.createNewItemInList);
router.get('/list/:list_id/item/', UserController.getAllListItems);
router.put('/list/:list_id/item/:item_id/update', UserController.updateItemInList);

module.exports = router;
