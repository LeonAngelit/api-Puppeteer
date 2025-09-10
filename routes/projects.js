const express = require("express");
const VercelService = require("../services/vercel.service");
const dotenv = require("dotenv");
dotenv.config();
const service = new VercelService();
const router = express.Router();
const url = process.env.VERCEL_URL
router.get("/", async (req, res, next) => {
  try {
    const response = await service.find(url)
    res.json(response);
  } catch (error) {
    next(error);
  }
});

module.exports = router;
