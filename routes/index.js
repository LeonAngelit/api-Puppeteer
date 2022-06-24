const productsRouter = require('./products');
const departmentRouter = require('./department');
const ordersRouter = require('./orders');
const usersRouter = require('./users');
const express = require('express');

function routerAPI(app){
  const router = express.Router();
  app.use('/api/v1', router)
  router.use('/products', productsRouter);
  router.use('/departments', departmentRouter);
  router.use('/orders', ordersRouter);
  router.use('/users', usersRouter);
}

module.exports = routerAPI;
