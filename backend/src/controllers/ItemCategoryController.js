const ItemCategory = require('../models/ItemCategory');

const getAllItemCategories = async (req, res) => {
  try {
    const itemCategories = await ItemCategory.findAll();
    res.json(itemCategories);
  } catch (error) {
    res.status(500).json({ message: 'Error fetching item categories' });
  }
};

module.exports = {
  getAllItemCategories: getAllItemCategories,
};
