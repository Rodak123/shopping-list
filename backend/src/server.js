const express = require('express');
const cors = require('cors');

const sequelize = require('./connection');

const User = require('./models/User');
const ShoppingList = require('./models/ShoppingList');
const Item = require('./models/Item');
const ItemType = require('./models/ItemType');
const ItemCategory = require('./models/ItemCategory');

(async () => {
  User.belongsToMany(ShoppingList, { through: 'UserShoppingList' });
  ShoppingList.belongsToMany(User, { through: 'UserShoppingList' });

  ShoppingList.hasMany(Item, { foreignKey: 'shopping_list_id', as: 'items' });
  Item.belongsTo(ShoppingList, { foreignKey: 'shopping_list_id', allowNull: false });

  ItemType.hasMany(Item, { foreignKey: 'item_type_id', as: 'item_types' });
  Item.belongsTo(ItemType, { foreignKey: 'item_type_id', allowNull: false });

  ItemCategory.hasMany(ItemType, { foreignKey: 'item_category_id', as: 'item_categories' });
  ItemType.belongsTo(ItemCategory, { foreignKey: 'item_category_id', allowNull: false });

  ItemCategory.hasMany(ItemCategory, { foreignKey: 'parent_category_id', as: 'parent_categories' });
  ItemCategory.belongsTo(ItemCategory, { foreignKey: 'parent_category_id', allowNull: true });

  //await sequelize.sync({ force: process.env.NODE_ENV === 'development' ? true : false });
  await sequelize.sync({ force: true }); // Use { force: true } only during development
  console.log('Tables created!');
})();

const app = express();
const PORT = process.env.PORT || 5000;

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
