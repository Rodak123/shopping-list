const ShoppingList = require('../models/ShoppingList');
const User = require('../models/User');

const getAllUsers = async (req, res) => {
  try {
    const users = await User.findAll();
    res.json(users);
  } catch (error) {
    res.status(500).json({ message: 'Error fetching users' });
  }
};

const getUserById = async (req, res) => {
  const id = req.params.id;
  try {
    const user = await User.findByPk(id);
    res.json(user);
  } catch (error) {
    res.status(500).json({ message: 'Error fetching user' });
  }
};

const createNewList = async (req, res) => {
  const id = req.params.id;
  const listName = req.body.name;
  try {
    const user = await User.findByPk(id);

    const list = ShoppingList.create({
      name: listName,
    });

    await user.addShoppingList(list);

    res.status(201).json(list.toJSON());
  } catch (error) {
    res.status(500).json({ message: 'Error creating new list' });
  }
};

const getAllLists = async (req, res) => {
  const userId = req.params.id;
  try {
    const user = await User.findByPk(userId, {
      include: ShoppingList,
    });

    if (!user) {
      res.status(404).json({ message: 'User not found' });
      return;
    }

    res.status(200).json(user.Shopping_Lists);
  } catch (error) {
    console.error('Error fetching lists:', error);
    res.status(500).json({ message: 'Error fetching lists' });
  }
};

module.exports = {
  getAllUsers: getAllUsers,
  getUserById: getUserById,
  createNewList: createNewList,
  getAllLists: getAllLists,
};
