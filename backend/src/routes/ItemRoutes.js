const express = require('express');
const ItemController = require('../controllers/ItemController');
const router = express.Router();

router.get('/', ItemController.getAllItems);

module.exports = router;
