const express = require('express');
const ShoppingListController = require('../controllers/ShoppingListController');
const router = express.Router();

router.get('/', ShoppingListController.getAllShoppingLists);

module.exports = router;
