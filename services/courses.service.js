const { chromium } = require("playwright");
const { exec } = require("child_process");
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
		await exec("npx playwright install");
		let browser;

		browser = await chromium.launch({ headless: true });
		//Lanzamos el navegador, la opción no sandbox era necesaria para habilitar puppeteer en la app en heroku
		const context = await browser.newContext({
			userAgent:
				"Mozilla/5.0 (Macintosh; Intel Mac OS X 10.15; rv:109.0) Gecko/20100101 Firefox/109.0",
		});

		let page = await context.newPage();
		await page.setExtraHTTPHeaders({
			"Accept-Language": "es-ES,es;q=0.9",
		});

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
				courses.map((curso) => {
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
