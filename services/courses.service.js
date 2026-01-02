const axios = require("axios");

//Creamos la clase que instanciaremos en el archivo courses.js
class CourseService {
  constructor() {
    this.courses = [];
  }
  async #getCourses(url, userName) {
    const fullUrl = url + userName + "/";
    const response = await axios.get(fullUrl);
      let array = [];
      response?.data?.courses.map((curso) => {
        array.push({
          title: curso.title,
          image: curso.badge,
          link: curso.diploma_link,
        });
      });
      return array;
  
  }
  //Este es el método público que he usado para acceder al privado
  find(url, userName) {
    return this.#getCourses(url, userName);
  }
}
module.exports = CourseService;
