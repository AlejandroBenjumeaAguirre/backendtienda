const faker = require('faker');
const Boom = require('@hapi/boom');

class ProductsService {

  constructor() {
    this.products = [];
    this.generate();
  }

  generate() {
    const limit = 100;
    for (let index = 0; index < limit; index++) {
      this.products.push({
        id: faker.datatype.uuid(),
        name: faker.commerce.productName(),
        price: parseInt(faker.commerce.price(), 10),
        imagen: faker.image.imageUrl(),
        isBlock: faker.datatype.boolean(),
      });
    }
  }

  async create(data) {
    const newProduct = {
      id: faker.datatype.uuid(),
      ...data
    }
    this.products.push(newProduct);
    return newProduct;
  }

  async find() {
    return this.products;
  }

  async findOne(id) {
    const product = this.products.find(item => item.id === id);
    if (!product) {
      throw Boom.notFound('product not found');
    }
    if (product.isBlock) {
      throw Boom.conflict('product is block');
    }
    return product;
  }

  async update(id, data) {
    const index = this.products.findIndex(item => item.id === id);
    if(index < 0){
      throw Boom.notFound('Product not found');
    }
    const product = this.products[index];
    this.products[index] = {
      ...product,
      ...data
    };
    return this.products[index];
  }

  async delete(id) {
    const index = this.products.findIndex(item => item.id === id);
    if(index < 0){
      throw Boom.notFound('Product not found');
    }
    this.products.splice(index, 1);
    return {id};
  }

}

module.exports = ProductsService;
