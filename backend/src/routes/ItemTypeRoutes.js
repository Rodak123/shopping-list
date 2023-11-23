const express = require('express');
const ItemTypeController = require('../controllers/ItemTypeController');
const router = express.Router();

router.get('/', ItemTypeController.getAllItemTypes);
router.get('/:id', ItemTypeController.getItemTypeById);

module.exports = router;
