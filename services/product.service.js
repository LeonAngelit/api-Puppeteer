const faker = require('faker');
const boom = require('@hapi/boom');

class ProductService{

  constructor(){
    this.products = [];
    this.generate();
  }

  generate(){
    const limit = 5
    for (let index = 0; index < limit; index++) {
      this.products.push({
        id: faker.datatype.uuid(),
        name: faker.commerce.productName(),
        price: parseInt(faker.commerce.price(), 10),
        image: faker.image.imageUrl(),
        isBlock: faker.datatype.boolean()
      });
    }
  }

  create(data){
    const newProduct = {
      id: faker.datatype.uuid(),
      ...data
    }
    this.products.push(newProduct);
    return newProduct;
  }

  find(){
    return this.products;
  }

  findOne(id){
    const product = this.products.find(item=> item.id === id);
    if(!product){
    throw boom.notFound('Product not found');
    }
    if(product.isBlock){
      throw boom.conflict('Product is block');
    }
    return product;
  }

  update(id, data){
    const index = this.products.findIndex(item=> item.id === id);
    if(index === -1){
      throw boom.notFound('Product not found');
    }

    this.products[index] = {
      ...this.products[index],
      ...data
    };
    return this.products[index];
  }

  delete(id){
    const index = this.products.findIndex(item=> item.id === id);
    if(index === -1){
      throw boom.notFound('Product not found');
    }

    this.products.splice(index,1);
    return {id};

  }
}

module.exports = ProductService;
