const ShoppingList = require('../models/ShoppingList');
const User = require('../models/User');

const getAllUsers = async (req, res) => {
    try {
        const users = await User.findAll();
        res.json(users);
    } catch (error) {
        res.status(500).json({ message: 'Error fetching users', error: error });
    }
};

const getUserById = async (req, res) => {
    const id = req.params.id;

    try {
        const user = await User.findByPk(id);
        res.json(user);
    } catch (error) {
        res.status(500).json({ message: 'Error fetching user', error: error });
    }
};

const createNewList = async (req, res) => {
    const id = req.params.id;
    const listData = req.body;
    if (!listData.name) {
        return res.status(400).json({ message: 'Name is required', error: error });
    }
    try {
        const user = await User.findByPk(id);

        if (!user) {
            return res.status(404).json({ message: 'User not found', error: error });
        }

        const shoppingList = await ShoppingList.create({
            name: listData.name,
        });

        await user.addShopping_List(shoppingList);

        res.status(201).json(shoppingList.toJSON());
    } catch (error) {
        console.error('Error creating new list:', error);
        res.status(500).json({ message: 'Error creating new list', error: error });
    }
};

const getAllLists = async (req, res) => {
    const userId = req.params.id;
    try {
        const user = await User.findByPk(userId, {
            include: ShoppingList,
        });

        if (!user) {
            res.status(404).json({ message: 'User not found', error: error });
            return;
        }

        res.status(200).json(user.Shopping_Lists);
    } catch (error) {
        res.status(500).json({ message: 'Error fetching lists', error: error });
    }
};

const getListById = async (req, res) => {
    const userId = req.params.id;
    const listId = req.params.list_id;
    try {
        const user = await User.findByPk(userId, {
            include: ShoppingList,
        });

        if (!user) {
            res.status(404).json({ message: 'User not found' });
            return;
        }

        const list = user.Shopping_Lists.find((list) => list.id == listId);

        if (!list) {
            res.status(404).json({ message: 'List not found' });
            return;
        }

        res.status(200).json(list);
    } catch (error) {
        res.status(500).json({ message: 'Error fetching list', error: error });
    }
};

module.exports = {
    getAllUsers: getAllUsers,
    getUserById: getUserById,
    createNewList: createNewList,
    getAllLists: getAllLists,
    getListById: getListById,
};
