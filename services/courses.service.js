const puppeteer = require("puppeteer-core");
const boom = require("@hapi/boom");
const edgeChromium = require("@sparticuz/chromium");
const axios = require("axios");

//Creamos la clase que instanciaremos en el archivo courses.js
class CourseService {
  constructor() {
    this.courses = [];
	this.regex = /window\.data\s*=\s*({[\s\S]*?});/
  }
  async #getCourses(url, userName) {
    const fullUrl = url + userName;
    const response = await axios.get(fullUrl);
    const match = response.data.match(this.regex);

    if (match) {
      const obj = new Function("return " + match[1])(); // Safer than eval
      let array = [];
      obj.courses.map((curso) => {
        array.push({
          title: curso.title,
          image: curso.badge,
          link: curso.diploma_link,
        });
      });
      return array;
    }
  }
  //Este es el método público que he usado para acceder al privado
  find(url, userName) {
    return this.#getCourses(url, userName);
  }
}
module.exports = CourseService;
