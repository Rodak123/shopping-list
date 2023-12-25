const express = require('express');
const cors = require('cors');

const sequelize = require('./connection');

const User = require('./models/User');
const ShoppingList = require('./models/ShoppingList');
const Item = require('./models/Item');
const ItemType = require('./models/ItemType');
const ItemCategory = require('./models/ItemCategory');
const AuthSession = require('./models/AuthSession');

const loadProductTaxonomy = require('../loadProductTaxonomy');

(async () => {
    User.hasOne(AuthSession, { foreignKey: 'user_id', allowNull: true });
    AuthSession.belongsTo(User, { foreignKey: 'user_id', allowNull: false });

    User.belongsToMany(ShoppingList, { through: 'UserShoppingList' });
    ShoppingList.belongsToMany(User, { through: 'UserShoppingList' });

    ShoppingList.hasMany(Item, { foreignKey: 'shopping_list_id' });
    Item.belongsTo(ShoppingList, { foreignKey: 'shopping_list_id', allowNull: false });

    ItemType.hasMany(Item, { foreignKey: 'item_type_id' });
    Item.belongsTo(ItemType, { foreignKey: 'item_type_id', allowNull: false });

    ItemCategory.hasMany(ItemType, { foreignKey: 'item_category_id' });
    ItemType.belongsTo(ItemCategory, { foreignKey: 'item_category_id', allowNull: false });

    ItemCategory.hasMany(ItemCategory, {
        foreignKey: 'parent_category_id',
    });
    ItemCategory.belongsTo(ItemCategory, { foreignKey: 'parent_category_id', allowNull: true });

    const forceCreate = true; // Only during dev

    await sequelize.sync({ force: forceCreate });
    console.log('Tables created!');

    // ---
    // Load data
    if (forceCreate) {
        //const taxonomy = await loadProductTaxonomy('./product_type_taxonomy.xml');
        const taxonomy = {
            Root: {
                Item: await loadProductTaxonomy('./product_type_taxonomy.txt'),
            },
        };
        const addAll = async (root) => {
            const self = root['$'];
            const categories = root['Category'];
            const items = root['Item'];

            let rootCategory = null;
            if (self) {
                rootCategory = await ItemCategory.create({
                    name: self['name'],
                });
            }

            if (items) {
                await items.forEach(async (item) => {
                    const type = await ItemType.create({
                        name: item,
                    });

                    if (rootCategory !== null) {
                        rootCategory.addItemType(type);
                    }
                });
            }

            if (categories) {
                await categories.forEach(async (categoryData) => {
                    const category = await addAll(categoryData);
                    if (category !== null && rootCategory !== null) {
                        rootCategory.addItemCategory(category);
                    }
                });
            }

            return rootCategory;
        };
        await addAll(taxonomy['Root']);

        console.log('Taxonomy loaded!');

        // await User.create({
        //     user_name: 'JohnDoe',
        // });
        // console.log('Added John!');

        console.log('No John Added!');
    }
})();

const authorization = async (req, res, next) => {
    const authheader = req.headers.authorization;

    if (!authheader) {
        return res.status(401).json({ message: 'No authorization header' });
    }

    try {
        const session = await AuthSession.findOne({ where: { token: authheader } });
        if (!session) {
            return res.status(401).json({ message: 'Invalid token' });
        }

        if (session.date_expires.getTime() < new Date()) {
            await session.destroy();
            return res.status(401).json({ message: 'Session is expired' });
        }

        req.session = session;

        return next();
    } catch (error) {
        console.log(error);
        return res.status(500).json({ message: 'Error validating token', error: error });
    }
};

const app = express();
const PORT = process.env.PORT || 3100;

app.use(
    cors({
        origin: 'http://localhost:3100',
        methods: 'GET,POST,PUT,DELETE',
        credentials: true,
    })
);

app.use(express.json());

app.use((req, res, next) => {
    res.setHeader('Cross-Origin-Opener-Policy', 'same-origin');
    next();
});

const userAuth = require('./userAuth');

app.post('/register', userAuth.register);

app.post('/login', userAuth.login);

app.use(authorization);

app.get('/logout', userAuth.logout);

const userRoutes = require('./routes/UserRoutes');
const shoppingListRoutes = require('./routes/ShoppingListRoutes');
const itemRoutes = require('./routes/ItemRoutes');
const itemTypeRoutes = require('./routes/ItemTypeRoutes');
const itemCategoryRoutes = require('./routes/ItemCategoryRoutes');

const testRoutes = require('./routes/TestRoutes');

app.use('/shopping-list', shoppingListRoutes);
app.use('/user', userRoutes);
app.use('/item', itemRoutes);
app.use('/item/type', itemTypeRoutes);
app.use('/item/category', itemCategoryRoutes);
app.use('/test', testRoutes);

app.get('/', (req, res) => {
    res.send('This is the shopping-list API!');
});

app.listen(PORT, () => {
    console.log(`Backend server listening on port ${PORT}`);
});

process.on('exit', (code) => {
    sequelize.close().then((r) => () => {
        server.close();
    });
});
