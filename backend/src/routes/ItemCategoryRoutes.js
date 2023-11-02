const express = require('express');
const ItemCategoryController = require('../controllers/ItemCategoryController');
const router = express.Router();

router.get('/', ItemCategoryController.getAllItemCategories);

module.exports = router;
