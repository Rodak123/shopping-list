const ItemType = require('../models/ItemType');

const getAllItemTypes = async (req, res) => {
    try {
        const itemTypes = await ItemType.findAll();
        res.json(itemTypes);
    } catch (error) {
        res.status(500).json({ message: 'Error fetching item types' });
    }
};

const getItemTypeById = async (req, res) => {
    const { id } = req.params;
    try {
        const itemType = await ItemType.findByPk(id);
        res.json(itemType);
    } catch (error) {
        res.status(500).json({ message: 'Error fetching item type' });
    }
};

module.exports = {
    getAllItemTypes: getAllItemTypes,
    getItemTypeById: getItemTypeById,
};
