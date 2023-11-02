const ItemType = require('../models/ItemType');

const getAllItemTypes = async (req, res) => {
  try {
    const itemTypes = await ItemType.findAll();
    res.json(itemTypes);
  } catch (error) {
    res.status(500).json({ message: 'Error fetching item types' });
  }
};

module.exports = {
  getAllItemTypes: getAllItemTypes,
};
