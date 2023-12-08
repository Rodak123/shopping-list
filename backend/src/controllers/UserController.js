const e = require('express');
const ShoppingList = require('../models/ShoppingList');
const User = require('../models/User');
const ItemType = require('../models/ItemType');
const Item = require('../models/Item');

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
    const { id } = req.params;
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

        await user.addShoppingList(shoppingList);

        res.status(201).json(shoppingList.toJSON());
    } catch (error) {
        console.error('Error creating new list:', error);
        res.status(500).json({ message: 'Error creating new list', error: error });
    }
};

const getAllLists = async (req, res) => {
    const { id } = req.params;
    try {
        const user = await User.findByPk(id, {
            include: ShoppingList,
        });

        if (!user) {
            res.status(404).json({ message: 'User not found', error: error });
            return;
        }

        res.status(200).json(user.ShoppingLists);
    } catch (error) {
        res.status(500).json({ message: 'Error fetching lists', error: error });
    }
};

const getListById = async (req, res) => {
    const { id, list_id } = req.params;
    try {
        const user = await User.findByPk(id, {
            include: ShoppingList,
        });

        if (!user) {
            res.status(404).json({ message: 'User not found' });
            return;
        }

        const list = user.ShoppingLists.find((list) => list.id == list_id);

        if (!list) {
            res.status(404).json({ message: 'List not found' });
            return;
        }

        res.status(200).json(list);
    } catch (error) {
        res.status(500).json({ message: 'Error fetching list', error: error });
    }
};

const renameList = async (req, res) => {
    const { id, list_id } = req.params;
    const { name } = req.body;
    if (!name) {
        res.status(400).json({ message: 'New name is required' });
        return;
    }
    try {
        const user = await User.findByPk(id, {
            include: ShoppingList,
        });

        if (!user) {
            res.status(404).json({ message: 'User not found' });
            return;
        }

        const list = user.ShoppingLists.find((list) => list.id == list_id);

        if (!list) {
            res.status(404).json({ message: 'List not found' });
            return;
        }

        list.name = name;

        await list.save();

        res.status(200).json(list);
    } catch (error) {
        res.status(500).json({ message: 'Error renaming list', error: error });
    }
};

const deleteList = async (req, res) => {
    const { id, list_id } = req.params;
    try {
        const user = await User.findByPk(id, {
            include: ShoppingList,
        });

        if (!user) {
            res.status(404).json({ message: 'User not found' });
            return;
        }

        const list = user.ShoppingLists.find((list) => list.id == list_id);

        if (!list) {
            res.status(404).json({ message: 'List not found' });
            return;
        }

        await list.destroy();

        res.status(200).json(list);
    } catch (error) {
        res.status(400).json({ message: 'Error deleting list', error: error });
    }
};

const createNewItemInList = async (req, res) => {
    const { id, list_id } = req.params;
    const { note, quantity, type_id } = req.body;
    if (!note || !quantity || !type_id) {
        res.status(400).json({ message: 'Note, quantity, and type are required' });
        return;
    }
    try {
        const user = await User.findByPk(id, {
            include: ShoppingList,
        });

        if (!user) {
            res.status(404).json({ message: 'User not found' });
            return;
        }

        const list = user.ShoppingLists.find((list) => list.id == list_id);

        if (!list) {
            res.status(404).json({ message: 'List not found' });
            return;
        }

        const item = await list.createItem({
            note: note,
            quantity: quantity,
        });

        const type = await ItemType.findByPk(type_id);

        if (!type) {
            res.status(404).json({ message: 'Type not found' });
            return;
        }

        await item.setItemType(type);

        await item.save();

        await list.addItem(item);

        await list.save();

        res.status(201).json(item);
    } catch (error) {
        res.status(500).json({ message: 'Error creating new item', error: error });
    }
};

const getAllListItems = async (req, res) => {
    const { id, list_id } = req.params;
    try {
        const user = await User.findByPk(id, {
            include: ShoppingList,
        });

        if (!user) {
            res.status(404).json({ message: 'User not found' });
            return;
        }

        const list = user.ShoppingLists.find((list) => list.id == list_id);

        if (!list) {
            res.status(404).json({ message: 'List not found' });
            return;
        }

        const items = await list.getItems();

        res.status(200).json(items);
    } catch (error) {
        res.status(500).json({ message: 'Error fetching items', error: error });
    }
};

const updateItemInList = async (req, res) => {
    const { id, list_id, item_id } = req.params;
    const { quantity } = req.data;
    if (quantity === undefined || quantity === null) {
        res.status(400).json({ message: 'Quantity is required' });
        return;
    }
    try {
        const user = await User.findByPk(id, {
            include: ShoppingList,
        });

        if (!user) {
            res.status(404).json({ message: 'User not found' });
            return;
        }

        const list = user.ShoppingLists.find((list) => list.id == list_id);

        if (!list) {
            res.status(404).json({ message: 'List not found' });
            return;
        }

        const item = await list.Items.findOne({ where: { id: item_id } });

        if (!item) {
            res.status(404).json({ message: 'Item not found' });
            return;
        }

        item.quantity = quantity;

        await item.save();

        await list.save();

        res.status(201).json(item);
    } catch (error) {
        res.status(500).json({ message: 'Error updating item', error: error });
    }
};

module.exports = {
    getAllUsers: getAllUsers,
    getUserById: getUserById,

    createNewList: createNewList,
    getAllLists: getAllLists,
    getListById: getListById,
    renameList: renameList,
    deleteList: deleteList,

    createNewItemInList: createNewItemInList,
    getAllListItems: getAllListItems,
    updateItemInList: updateItemInList,
};
