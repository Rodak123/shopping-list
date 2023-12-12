const express = require('express');
const cors = require('cors');
const bcrypt = require('bcrypt');
const saltRounds = 10;

const Sequelize = require('sequelize');
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
        const taxonomy = await loadProductTaxonomy('./product_type_taxonomy.xml');
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
        origin: 'http://localhost:3000',
        methods: 'GET,POST,PUT,DELETE',
        credentials: true,
    })
);

app.use(express.json());

app.use((req, res, next) => {
    res.setHeader('Cross-Origin-Opener-Policy', 'same-origin');
    next();
});

app.post('/register', async (req, res) => {
    const { user_name, password, password_confirm } = req.body;

    if (!user_name || !password || !password_confirm) {
        return res
            .status(400)
            .json({ message: 'No user name or password or password confirm provided' });
    }

    try {
        const existingUser = await User.findOne({ where: { user_name: user_name } });

        if (existingUser) {
            return res.status(400).json({ message: 'User name already exists' });
        }

        if (password !== password_confirm) {
            return res.status(400).json({ message: 'Passwords do not match' });
        }

        const hashedPassword = await bcrypt.hash(password, saltRounds);

        const user = await User.create({
            user_name: user_name,
            password: hashedPassword,
        });

        res.status(201).json(user);
    } catch (error) {
        res.status(500).json({ message: 'Error registering user' });
    }
});

app.post('/login', async (req, res) => {
    const { user_name, password } = req.body;

    if (!user_name || !password) {
        return res.status(400).json({ message: 'No user name or password provided' });
    }

    try {
        const user = await User.findOne({
            where: {
                user_name: user_name,
            },
        });

        if (!user) {
            return res.status(404).json({ message: 'User name or password is wrong' });
        }

        const passwordsMatch = await bcrypt.compare(password, user.password);

        if (!passwordsMatch) {
            return res.status(401).json({ message: 'User name or password is wrong' });
        }

        await AuthSession.destroy({ where: { user_id: user.id } });

        const date_expires = new Date(Date.now() + 1000 * 60 * 60 * 24 * 3); // +3 days

        const generatedToken = bcrypt.hashSync(user.id + date_expires, saltRounds);

        const session = await AuthSession.create({
            user_id: user.id,
            token: generatedToken,
            date_expires: date_expires,
        });

        res.status(200).json(session);
    } catch (error) {
        console.log(error);
        res.status(500).json({ message: 'Error logging in' });
    }
});

app.use(authorization);

app.get('/logout', async (req, res) => {
    const session = req.session;
    try {
        await session.destroy();
        res.status(200).json({ message: 'Logged out' });
    } catch (error) {
        res.status(500).json({ message: 'Error logging out', error: error });
    }
});

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
