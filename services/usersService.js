const faker = require('faker');

class UsersService {

  constructor() {
    this.users = [];
    this.generate();
  }

  generate() {
    const limit = 100;

    for (let index = 0; index < limit; index++) {
      this.users.push({
        id: faker.datatype.uuid(),
        name: faker.name.firstName(),
        phone: faker.phone.phoneNumber(),
        address: faker.address.streetAddress(),
        imagen: faker.image.imageUrl(),
      });
    }
  }

  find() {
    return this.users;
  }

  findOne(id) {
    return this.users.find(user => user.id === id);
  }
}


module.exports = UsersService;
