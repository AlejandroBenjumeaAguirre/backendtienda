const Joi = require('joi');

const id = Joi.string().uuid();
const name = Joi.string().min(3).max(100);
const price = Joi.number().integer().min(1);
const image = Joi.string().uri();


const createProductSchema = Joi.object({
  name: name.required(),
  price: price.required(),
  imagen: image
});

const updateProductSchema = Joi.object({
  name: name,
  price: price,
  imagen: image
});

const getProductSchema = Joi.object({
  id: id.required(),
});


module.exports = {
  createProductSchema,
  updateProductSchema,
  getProductSchema
}
