let chrome = {};
let puppeteer;

if (process.env.AWS_LAMBDA_FUNCTION_VERSION) {
  // running on the Vercel platform.
   chrome = require('chrome-aws-lambda');
 puppeteer = require('puppeteer-core');
} else {
  // running locally.
   puppeteer = require('puppeteer');
}

const boom = require("@hapi/boom");

//Creamos la clase que instanciaremos en el archivo courses.js
class CourseService {
  constructor() {
    this.courses = [];
  }

  /*Aqui es donde usamos puppeteer para conseguir los datos y almacenarlos en la variable generada en el constructor
  hice el método privado para luego llamarla desde el método find*/

  //Pasamos la url y el nombre de usuario como parámetros
  async #getCourses(url, userName) {
    //Lanzamos el navegador, la opción no sandbox era necesaria para habilitar puppeteer en la app en heroku
    let browser = await puppeteer.launch(
      {
        args: [...chrome.args, '--hide-scrollbars', '--disable-web-security'],
        defaultViewport: chrome.defaultViewport,
        executablePath: await chrome.executablePath,
        headless: true,
        ignoreHTTPSErrors: true,
        ignoreDefaultArgs: ['--disable-extensions'],
      }
    );
    let page = await browser.newPage();
    await page.setExtraHTTPHeaders({
      "Accept-Language": "es-ES,es;q=0.9",
    });

    //Establecemos los user agent
    await page.setUserAgent(
      "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/66.0.3359.181 Safari/537.36"
    );
    //Aquí vamos a la url :), una parte de la url está en una variable de entorno, y la otra es el username es el que le pasamos
    await page.goto(`${url}${userName}`);

    //Aquí almacenamos el resultado de la búsqueda de datos en la variable this.courses
    this.courses = await page.evaluate(() => {
      //Si no hay datos devolvemos undefined
      if (window.data == undefined) {
        return undefined;
      } else {
        //En caso contrario procesamos los datos, yo necesitaba el título, la imagen del curso y el link al diploma!
        //Elegí esta manera para almacenar los datos, en un array temporal que devuelvo
        let courses = window.data.courses;
        let array = [];
        courses.forEach((curso) => {
          array.push({
            title: curso.title,
            image: curso.badge,
            link: curso.diploma_link,
          });
        });
        return array;
      }
    });
    //Es importante cerrar el browser al terminar
    await browser.close();
    //Si finalmente no hemos devuelto datos, devolvemos un error con boom diciendo que no hemos encontrado el nombre de usuario
    if (this.courses == undefined) {
      throw boom.notFound("Usuario no encontrado, revisa el nombre de usuario");
    } else {
      //En caso contrario devolvemos la información!
      return this.courses;
    }
  }
  //Este es el método público que he usado para acceder al privado
  find(url, userName) {
    return this.#getCourses(url, userName);
  }
}

module.exports = CourseService;
