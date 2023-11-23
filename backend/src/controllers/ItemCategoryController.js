const ItemCategory = require('../models/ItemCategory');

const getAllItemCategories = async (req, res) => {
    try {
        const itemCategories = await ItemCategory.findAll();
        res.json(itemCategories);
    } catch (error) {
        res.status(500).json({ message: 'Error fetching item categories' });
    }
};

const getCategoryById = async (req, res) => {
    const { id } = req.params;
    try {
        const itemCategory = await ItemCategory.findByPk(id);
        res.json(itemCategory);
    } catch (error) {
        res.status(500).json({ message: 'Error fetching item category' });
    }
};

module.exports = {
    getAllItemCategories: getAllItemCategories,
    getCategoryById: getCategoryById,
};
