const express = require('express');
const CourseService = require('../services/courses.service');

const router = express.Router();

const service = new CourseService();

router.get('/:userName', async (req, res) => {
  const { userName } = req.params;
  const courses = await service.find(userName);
  res.json(courses);
});

module.exports = router;
