const faker = require('faker');
const boom = require('@hapi/boom');

class OrderService{

  constructor(){
    this.orders = [];
    this.generate();
  }

  generate(){
    const limit = 5
    for (let index = 0; index < limit; index++) {
      this.orders.push({
        id: faker.datatype.uuid(),
        product: faker.commerce.product(),
        date: faker.datatype.datetime(),
        isBlock: faker.datatype.boolean()
      });
    }
  }

  create(data){
    const newOrder = {
      id: faker.datatype.uuid(),
      ...data
    }
    this.orders.push(newOrder);
    return newOrder;

  }

  find(){
    return this.orders;
  }

  findOne(id){
    const order = this.orders.find(item=> item.id === id);
    if(!order){
    throw boom.notFound('Order not found');
    }
    if(order.isBlock){
      throw boom.conflict('Order is block');
    }
    return order;
  }

  update(id, data){
    const index = this.orders.findIndex(item=> item.id === id);
    if(index === -1){
      throw boom.notFound('Order not found');
    }

    this.orders[index] = {
      ...this.orders[index],
      ...data
    };
    return this.orders[index];

  }

  delete(id){
    const index = this.orders.findIndex(item=> item.id === id);
    if(index === -1){
      throw boom.notFound('Order not found');
    }

    this.orders.splice(index,1);
    return {id};
  }
}

module.exports = OrderService;
