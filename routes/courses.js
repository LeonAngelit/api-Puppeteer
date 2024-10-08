const express = require("express");
const CourseService = require("../services/courses.service");
const DBService = require("../services/db.service");
const dotenv = require("dotenv");
dotenv.config();
const router = express.Router();
//Sacamos la url de la variable de entorno
const url = process.env.URL;
//Instanciamos el servicio que hemos importado
const service = new CourseService();
const db = new DBService();
//Establecemos la ruta que desencadena la respuesta del servicio, usando el parámetro de la petición para buscar
router.get("/:userName", async (req, res, next) => {
	try {
		const { userName } = req.params;
		let courses = await db.get(userName);
		res.json(courses.courses);
	} catch (error) {
		next(error);
	}
});

router.get("/:userName/update", async (req, res, next) => {
	try {
		const { userName } = req.params;
		const courses = await service.find(url, userName);
		res.json(courses);
	} catch (error) {
		next(error);
	}
});

router.post("/:userName/update", async (req, res, next) => {
	try {
		const { userName } = req.params;
		const courses = req.body;
		await db.save(userName, courses);
		res.json(courses);
	} catch (error) {
		next(error);
	}
});

module.exports = router;
