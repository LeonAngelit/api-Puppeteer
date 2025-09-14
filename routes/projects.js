const express = require("express");
const VercelService = require("../services/vercel.service");
const dotenv = require("dotenv");
dotenv.config();
const service = new VercelService();
const router = express.Router();
const url = process.env.VERCEL_URL_API;
router.get("/", async (req, res, next) => {
  try {
    const response = await service.find(url);
    res.json(response);
  } catch (error) {
    next(error);
  }
});

router.get("/images/:id", async (req, res, next) => {
  try {
    const { id } = req.params;
    const response = await service.fetchImage(id);
    res.setHeader("Content-Type", "image/png");
    res.send(response);
  } catch (error) {
    next(error);
  }
});
module.exports = router;
