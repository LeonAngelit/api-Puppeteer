const express = require('express');
const DepartmentService = require('../services/department.service');

const router = express.Router();

const service = new DepartmentService();
const validatorHandler = require('./../midlewares/validator.handler');
const {
  createDepartmentSchema,
  updateDepartmentSchema,
  getDepartmentSchema,
} = require('./../schemas/department.schema');

router.get('/', (req, res) => {
  const departments = service.find();
  res.json(departments);
});

router.get(
  '/:id',
  validatorHandler(getDepartmentSchema, 'params'),
  async (req, res, next) => {
    try {
      const { id } = req.params;
      const department = await service.findOne(id);
      res.json(department);
    } catch (error) {
      next(error);
    }
  }
);

router.post(
  '/',
  validatorHandler(createDepartmentSchema, 'body'),
  async (req, res, next) => {
    try {
      const body = req.body;
      const newDepartment = service.create(body);
      res.status(201).json(newDepartment);
    } catch (error) {
      next(error);
    }
  }
);

router.put(
  '/:id',
  validatorHandler(getDepartmentSchema, 'params'),
  validatorHandler(updateDepartmentSchema, 'body'),
  async (req, res, next) => {
    try {
      const { id } = req.params;
      const body = req.body;
      const department = await service.update(id, body);
      res.json(department);
    } catch (error) {
      next(error);
    }
  }
);

router.patch(
  '/:id',
  validatorHandler(getDepartmentSchema, 'params'),
  validatorHandler(updateDepartmentSchema, 'body'),
  async (req, res, next) => {
    try {
      const { id } = req.params;
      const body = req.body;
      const department = await service.update(id, body);
      res.json(department);
    } catch (error) {
      next(error);
    }
  }
);

router.delete(
  '/:id',
  validatorHandler(getDepartmentSchema, 'params'),
  async (req, res, next) => {
    try {
      const { id } = req.params;
      const deleted = await service.delete(id);
      res.json(deleted);
    } catch (error) {
      next(error);
    }
  }
);

module.exports = router;
