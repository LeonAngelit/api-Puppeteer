const Joi = require('joi');

const id = Joi.string().uuid();
const name = Joi.string().min(3).max(15);

const createDepartmentSchema = Joi.object({
  name: name.required(),
});

const updateDepartmentSchema = Joi.object({
  name: name,

});

const getDepartmentSchema = Joi.object({
  id: id.required(),
});

module.exports = {createDepartmentSchema, updateDepartmentSchema, getDepartmentSchema}
