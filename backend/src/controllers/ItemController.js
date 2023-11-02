const Item = require('../models/Item');

const getAllItems = async (req, res) => {
  try {
    const items = await Item.findAll();
    res.json(items);
  } catch (error) {
    res.status(500).json({ message: 'Error fetching items' });
  }
};

module.exports = {
  getAllItems: getAllItems,
};
