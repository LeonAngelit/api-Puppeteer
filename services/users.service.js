const faker = require('faker');
const boom = require('@hapi/boom');


class UserService{

  constructor(){
    this.users = [];
    this.generate();
  }

  generate(){
    const limit = 5
    for (let index = 0; index < limit; index++) {
      this.users.push({
        id: faker.datatype.uuid(),
        name: faker.internet.userName(),
        email: faker.internet.email(),
        avatar: faker.internet.avatar(),
        isBlock: faker.datatype.boolean(),
      });
    }
  }

  create(data){
    const newUser = {
      id: faker.datatype.uuid(),
      ...data
    }
    this.users.push(newUser);
    return newUser;

  }

  find(){
    return this.users;
  }

  findOne(id){
    const user = this.users.find(item=> item.id === id);
    if(!user){
    throw boom.notFound('User not found');
    }
    if(user.isBlock){
      throw boom.conflict('User is block');
    }
    return user;
  }

  update(id, data){
    const index = this.users.findIndex(item=> item.id === id);
    if(index === -1){
      throw boom.notFound('User not found');
    }

    this.users[index] = {
      ...this.users[index],
      ...data
    };
    return this.users[index];

  }

  delete(id){
    const index = this.users.findIndex(item=> item.id === id);
    if(index === -1){
      throw boom.notFound('User not found');
    }

    this.users.splice(index,1);
    return {id};
  }
}

module.exports = UserService;
