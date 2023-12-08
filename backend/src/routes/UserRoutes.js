const express = require('express');
const router = express.Router();
const UserController = require('../controllers/UserController');

router.get('/', UserController.getAllUsers);
router.get('/:id', UserController.getUserById);

router.put('/:id/list/create', UserController.createNewList);
router.get('/:id/list', UserController.getAllLists);
router.get('/:id/list/:list_id', UserController.getListById);
router.put('/:id/list/:list_id/rename', UserController.renameList);
router.delete('/:id/list/:list_id/delete', UserController.deleteList);

router.put('/:id/list/:list_id/item/create', UserController.createNewItemInList);
router.get('/:id/list/:list_id/item/', UserController.getAllListItems);
router.put('/:id/list/:list_id/item/:item_id/update', UserController.updateItemInList);

module.exports = router;
