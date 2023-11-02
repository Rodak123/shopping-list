const express = require('express');
const cors = require('cors');

const sequelize = require('./connection');

const User = require('./models/User');
const ShoppingList = require('./models/ShoppingList');

(async () => {
  User.belongsToMany(ShoppingList, { through: 'UserShoppingList' });
  ShoppingList.belongsToMany(User, { through: 'UserShoppingList' });

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

const userRoutes = require('./routes/userRoutes');
const shoppingListRoutes = require('./routes/shoppingListRoutes');
const testRoute = require('./routes/test');

app.use('/shopping-list', shoppingListRoutes);
app.use('/user', userRoutes);
app.use('/test', testRoute);

app.get('/', (req, res) => {
  res.send('Hello World!');
});

app.listen(PORT, () => {
  console.log(`Example app listening on port ${PORT}`);
});

process.on('exit', (code) => {
  sequelize.close().then((r) => () => {
    server.close();
  });
});
