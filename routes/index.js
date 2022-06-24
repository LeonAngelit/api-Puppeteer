const cousesRouter = require('./courses');
const express = require('express');

function routerAPI(app) {
  const router = express.Router();
  app.use('/api/v1', router);
  router.use('/courses', cousesRouter);
}

module.exports = routerAPI;
