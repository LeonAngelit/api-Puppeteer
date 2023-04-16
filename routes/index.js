const coursesRouter = require("./courses");
const express = require("express");

function routerAPI(app) {
  const router = express.router();
  app.use("/api/v1", router);
  router.use("/courses", coursesRouter);
}

module.exports = routerAPI;
