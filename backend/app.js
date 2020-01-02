const express = require('express');
const bodyParser = require('body-parser');
const errorHandler = require('./api/middlewares/error-handler');
const { applyMiddlewares } = require('./api/middlewares');

const {
  usersRoute,
  authRoute,
  storesRoute,
  cashiersRoute,
  employeesRoute,
  suppliersRoute,
  productsRoute,
  orderRoute
} = require('./api/routes');

const app = express();

applyMiddlewares(app);

app.use((req, res, next) => {
  res.header('Access-Control-Allow-Origin', '*');
  res.header('Access-Control-Allow-Headers', '*');
  res.header('Access-Control-Allow-Methods', 'PUT, POST, GET, DELETE, OPTIONS');
  next();
});
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

// api routes
app.use('/users', usersRoute);
app.use('/auth', authRoute);
app.use('/stores', storesRoute);
app.use('/orders', orderRoute);
app.use('/cashiers', cashiersRoute);
app.use('/employees', employeesRoute);
app.use('/suppliers', suppliersRoute);
app.use('/products', productsRoute);


app.use('/health', (req, res) => (res.status(200).json({ message: 'working' })));

app.use(errorHandler);

module.exports = app;
