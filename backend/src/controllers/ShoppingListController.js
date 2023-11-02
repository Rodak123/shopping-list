const ShoppingList = require('../models/ShoppingList');

const getAllShoppingLists = async (req, res) => {
  try {
    const shoppingLists = await ShoppingList.findAll();
    res.json(shoppingLists);
  } catch (error) {
    res.status(500).json({ message: 'Error fetching shopping lists' });
  }
};

module.exports = {
  getAllShoppingLists: getAllShoppingLists,
};
