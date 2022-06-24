const express = require('express');
const CourseService = require('../services/courses.service');

const router = express.Router();
const url = process.env.URL;

const service = new CourseService();

router.get('/:userName', async (req, res) => {
  const { userName } = req.params;
  const courses = await service.find(url, userName);
  res.json(courses);
});

module.exports = router;
