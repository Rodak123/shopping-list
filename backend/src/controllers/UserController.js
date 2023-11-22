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

module.exports = {
  getAllUsers: getAllUsers,
  getUserById: getUserById,
};
