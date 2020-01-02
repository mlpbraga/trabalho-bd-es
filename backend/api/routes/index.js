const usersRoute = require('./users');
const authRoute = require('./auth');
const storesRoute = require('./stores');
const cashiersRoute = require('./cashiers');
const employeesRoute = require('./employees');
const suppliersRoute = require('./suppliers');
const productsRoute = require('./products');
const orderRoute = require('./orders');

const routes = {
  usersRoute,
  authRoute,
  storesRoute,
  cashiersRoute,
  employeesRoute,
  suppliersRoute,
  productsRoute,
  orderRoute,
};

module.exports = routes;
