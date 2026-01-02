const axios = require("axios");
const res = require("express/lib/response");

//Creamos la clase que instanciaremos en el archivo courses.js
class CourseService {
  constructor() {
    this.courses = [];
  }
  async #getCourses(url, userName) {
    const firstPage = 1;
    const fullUrl = url + userName + "/?page_size=100&page=";
    let response = await axios.get(fullUrl + firstPage);
    const numberOfPages = response?.data?.metadata?.pages;
    let array = [];
    response?.data?.data?.courses.map((curso) => {
      array.push({
        title: curso.title,
        image: curso.badge_url,
        link: curso.diploma.diploma_url,
      });
    });
    for (let i = firstPage + 1; i <= numberOfPages; i++) {
      response = await axios.get(fullUrl + i);
      response?.data?.data?.courses.map((curso) => {
        array.push({
          title: curso.title,
          image: curso.badge_url,
          link: curso.diploma?.diploma_url,
        });
      });
    }
    return array;
  }
  //Este es el método público que he usado para acceder al privado
  find(url, userName) {
    return this.#getCourses(url, userName);
  }
}
module.exports = CourseService;
