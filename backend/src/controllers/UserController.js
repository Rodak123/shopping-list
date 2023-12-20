const ShoppingList = require('../models/ShoppingList');
const User = require('../models/User');
const ItemType = require('../models/ItemType');
const Item = require('../models/Item');
const UserItemType = require('../models/UserItemType');

// const getAllUsers = async (req, res) => {
//     try {
//         const users = await User.findAll();
//         res.json(users);
//     } catch (error) {
//         res.status(500).json({ message: 'Error fetching users', error: error });
//     }
// };

// const getUserById = async (req, res) => {
//     const id = req.params.id;

//     try {
//         const user = await User.findByPk(id);
//         res.json(user);
//     } catch (error) {
//         res.status(500).json({ message: 'Error fetching user', error: error });
//     }
// };

const getAllUserItemTypes = async (req, res) => {
    const id = req.session.user_id;
    try {
        const user = await User.findByPk(id);

        if (!user) {
            return res.status(404).json({ message: 'User not found', error: error });
        }

        const userItemTypes = await UserItemType.findAll({
            where: { user_id: id },
        });

        res.status(201).json(userItemTypes);
    } catch (error) {
        res.status(500).json({ message: 'Error fetching user item types' });
    }
};

const getUserItemTypeById = async (req, res) => {
    const id = req.session.user_id;
    const { item_type_id } = req.params;

    try {
        const user = await User.findByPk(id);

        if (!user) {
            return res.status(404).json({ message: 'User not found', error: error });
        }

        const userItemType = await UserItemType.findOne({
            where: { user_id: id, item_type_id: item_type_id },
        });

        res.status(201).json(userItemType);
    } catch (error) {
        res.status(500).json({ message: 'Error fetching user item type' });
    }
};

const getUserBySession = async (req, res) => {
    const id = req.session.user_id;

    try {
        const user = await User.findByPk(id);
        res.json(user);
    } catch (error) {
        res.status(500).json({ message: 'Error fetching user', error: error });
    }
};

const createNewList = async (req, res) => {
    const id = req.session.user_id;
    const { name } = req.body;

    if (!name) {
        name = 'Nákupní list';
        // return res.status(400).json({ message: 'Name is required', error: error });
    }

    try {
        const user = await User.findByPk(id);

        if (!user) {
            return res.status(404).json({ message: 'User not found', error: error });
        }

        const shoppingList = await ShoppingList.create({
            name: name,
            owner: user.id,
        });

        await user.addShoppingList(shoppingList);

        res.status(201).json(shoppingList.toJSON());
    } catch (error) {
        console.error('Error creating new list:', error);
        res.status(500).json({ message: 'Error creating new list', error: error });
    }
};

const getAllLists = async (req, res) => {
    const id = req.session.user_id;
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
    const id = req.session.user_id;
    const { list_id } = req.params;
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
    const id = req.session.user_id;
    const { list_id } = req.params;
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
    const id = req.session.user_id;
    const { list_id } = req.params;
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

        if (list.owner !== user.id) {
            user.ShoppingLists.remove(list);
            await user.save();
            res.status(200).json(list);
        } else {
            await list.destroy();

            res.status(200).json(list);
        }
    } catch (error) {
        res.status(400).json({ message: 'Error deleting list', error: error });
    }
};

const createNewItemInList = async (req, res) => {
    const id = req.session.user_id;
    const { list_id } = req.params;
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

        const [userItemType, created] = await UserItemType.findOrCreate({
            where: { user_id: user.id, item_type_id: type.id },
        });
        userItemType.count_used = userItemType.count_used + 1;

        await userItemType.save();

        await item.save();

        await list.addItem(item);

        await list.save();

        res.status(201).json(item);
    } catch (error) {
        res.status(500).json({ message: 'Error creating new item', error: error });
    }
};

const deleteItemInList = async (req, res) => {
    const id = req.session.user_id;
    const { list_id, item_id } = req.params;

    try {
        const user = await User.findByPk(id, {
            include: {
                model: ShoppingList,
                include: Item,
            },
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

        const item = list.Items.find((item) => item.id == item_id);

        if (!item) {
            res.status(404).json({ message: 'Item not found' });
            return;
        }

        const type = await ItemType.findByPk(item.getItemType());
        if (type) {
            const [userItemType, created] = await UserItemType.findOrCreate({
                where: { user_id: user.id, item_type_id: type.id },
            });
            userItemType.count_used = userItemType.count_used - 1;

            if (userItemType.count_used <= 0) {
                await updateItemType.destroy();
            } else {
                await userItemType.save();
            }
        }

        await item.destroy();

        res.status(201).json(item);
    } catch (error) {
        res.status(500).json({ message: 'Error deleting item', error: error });
    }
};

const getAllListItems = async (req, res) => {
    const id = req.session.user_id;
    const { list_id } = req.params;
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

        const items = await list.getItems({
            order: [['checked', 'ASC']],
        });

        res.status(200).json(items);
    } catch (error) {
        res.status(500).json({ message: 'Error fetching items', error: error });
    }
};

const updateItemInList = async (req, res) => {
    const id = req.session.user_id;
    const { list_id, item_id } = req.params;
    let { delta_quantity, checked } = req.body;

    if (delta_quantity === undefined || delta_quantity === null) {
        delta_quantity = 0;
    }

    const change_checked = checked === true || checked === false;

    try {
        const user = await User.findByPk(id, {
            include: {
                model: ShoppingList,
                include: Item,
            },
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

        const item = list.Items.find((item) => item.id == item_id);

        if (!item) {
            res.status(404).json({ message: 'Item not found' });
            return;
        }

        item.quantity = item.quantity + delta_quantity;
        if (change_checked) item.checked = checked;

        await item.save();

        res.status(201).json(item);
    } catch (error) {
        res.status(500).json({ message: 'Error updating item', error: error });
    }
};

const shareShoppingList = async (req, res) => {
    const id = req.session.user_id;
    const { list_id } = req.params;
    const { with: user_uid } = req.body;

    if (!user_uid) {
        res.status(400).json({ message: 'User UID is required' });
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

        const userToShareWith = await User.findOne({
            where: {
                uid: user_uid,
            },
        });

        if (!userToShareWith) {
            res.status(404).json({ message: 'User to share with not found' });
            return;
        }

        if (userToShareWith.id === user.id) {
            res.status(400).json({ message: 'Cannot share list with yourself' });
            return;
        }

        await userToShareWith.addShoppingList(list);

        res.status(200).json({
            user_name: userToShareWith.user_name,
            uid: userToShareWith.uid,
        });
    } catch (error) {
        res.status(500).json({ message: 'Error sharing list', error: error });
    }
};

module.exports = {
    //getAllUsers: getAllUsers,
    //getUserById: getUserById,
    getUserBySession: getUserBySession,

    getAllUserItemTypes: getAllUserItemTypes,
    getUserItemTypeById: getUserItemTypeById,

    createNewList: createNewList,
    getAllLists: getAllLists,
    getListById: getListById,
    renameList: renameList,
    deleteList: deleteList,

    createNewItemInList: createNewItemInList,
    deleteItemInList: deleteItemInList,
    getAllListItems: getAllListItems,
    updateItemInList: updateItemInList,

    shareShoppingList: shareShoppingList,
};
