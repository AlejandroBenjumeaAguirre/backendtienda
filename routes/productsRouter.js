const express = require('express');

const productsService = require('../services/productService');

const validatorHandler = require('./../middleware/validatorHandler');
const {
  createProductSchema,
  updateProductSchema,
  getProductSchema
} = require('./../schemas/productSchema');

const router = express.Router();
const service = new productsService();

router.get('/', async (req, res) => {

  const products = await service.find();

  res.json(products);

});

router.get('/:id',
  validatorHandler(getProductSchema, 'params'),
  async (req, res, next) => {

    try {
      const { id } = req.params;
      const product = await service.findOne(id);
      res.json(product);
    } catch (error) {
      next(error);
    }

  }
);

router.post('/',
  validatorHandler(createProductSchema, 'body'),
  async (req, res) => {
    const body = req.body;
    const newProduct = await service.create(body);
    res.status(201).json(newProduct);
  }
);

router.patch('/:id',
  validatorHandler(getProductSchema, 'params'),
  validatorHandler(updateProductSchema, 'body'),
  async (req, res, next) => {
    try {
      const { id } = req.params;
      const body = req.body;
      const product = await service.update(id, body);
      res.status(201).json(product);
    } catch (error) {
      next(error);
    }
  }
);

router.delete('/:id', async (req, res) => {
  const { id } = req.params;

  const productId = await service.delete(id);

  res.status(200).json({
    message: `El producto con id ${productId} ha sido eliminado`
  });
});

module.exports = router;
