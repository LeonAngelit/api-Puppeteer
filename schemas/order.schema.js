const Joi = require('joi');

const id = Joi.string().uuid();
const product = Joi.string().min(3).max(15);
const date = Joi.date();

const createOrderSchema = Joi.object({
  product: product.required(),
  date: date.required(),
});

const updateOrderSchema = Joi.object({
  product: product,
  date: date
});

const getOrderSchema = Joi.object({
  id: id.required(),
});

module.exports = {createOrderSchema, updateOrderSchema, getOrderSchema}
