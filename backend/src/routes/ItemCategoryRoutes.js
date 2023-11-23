const express = require('express');
const ItemCategoryController = require('../controllers/ItemCategoryController');
const router = express.Router();

router.get('/', ItemCategoryController.getAllItemCategories);
router.get('/:id', ItemCategoryController.getCategoryById);

module.exports = router;
