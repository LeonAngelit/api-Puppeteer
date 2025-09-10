const coursesRouter = require("./courses");
const projectsRouter = require("./projects")
const express = require("express");
const dotenv = require("dotenv");
dotenv.config();

function routerAPI(app) {
  const router = express.Router();
  app.use("/api/v1", router);
  router.use("/courses", coursesRouter);
  router.use("/projects", projectsRouter);
}

module.exports = routerAPI;
