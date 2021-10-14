const faker = require('faker');

class CategoriesService {

  constructor(){
    this.categories = [];

  }

  generate() {
    const limit = 20;

    for (let index = 0; index < limit; index++) {
      this.categories.push({
        id: faker.datatype.uuid(),
        name: faker.commerce.product(),
      });
    }
  }

  find() {
    return this.categories;
  }

  findOne(id) {
    return this.categories.find(categorie => categorie.id === id);
  }
}

module.exports = CategoriesService;
