const faker = require('faker');
const boom = require('@hapi/boom');

class DepartmentService {
  constructor() {
    this.departments = [];
    this.generate();
  }

  generate() {
    const limit = 5;
    for (let index = 0; index < limit; index++) {
      this.departments.push({
        id: faker.datatype.uuid(),
        name: faker.commerce.department(),
        isBlock: faker.datatype.boolean(),
      });
    }
  }

  create(data) {
    const newDepartment = {
      id: faker.datatype.uuid(),
      ...data,
    };
    this.departments.push(newDepartment);
    return newDepartment;
  }

  find() {
    return this.departments;
  }

  findOne(id) {
    const department = this.departments.find(item => item.id === id);
    if (!department) {
      throw boom.notFound('Department not found');
    }
    if (department.isBlock) {
      throw boom.conflict('Department is block');
    }
    return department;
  }

  update(id, data) {
    const index = this.departments.findIndex((item) => item.id === id);
    if (index === -1) {
      throw boom.notFound('Department not found');
    }

    this.departments[index] = {
      ...this.departments[index],
      ...data,
    };
    return this.departments[index];
  }

  delete(id) {
    const index = this.departments.findIndex((item) => item.id === id);
    if (index === -1) {
      throw boom.notFound('Department not found');
    }

    this.departments.splice(index, 1);
    return { id };
  }
}

module.exports = DepartmentService;
