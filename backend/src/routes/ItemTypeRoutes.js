const express = require('express');
const ItemTypeController = require('../controllers/ItemTypeController');
const router = express.Router();

router.get('/', ItemTypeController.getAllItemTypes);

module.exports = router;
