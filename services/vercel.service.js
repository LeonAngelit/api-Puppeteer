const axios = require("axios");
const dotenv = require("dotenv");
dotenv.config();
class VercelService {
  constructor() {}
  #formatImage(id) {
    return process.env.VERCEL_IMAGE.replace("%s", id);
  }
  #normalizeString(val) {
    const capitalized =
      String(val).charAt(0).toUpperCase() + String(val).slice(1);
    return capitalized.replace("-", " ");
  }
  async #getProjects(url) {
    try{
const response = await axios.get(url, {
      headers: {
        Authorization: `Bearer ${process.env.TOKEN}`,
      },
    });
    const processedProjects = response.data.favorites.map((el) => {
      return {
        name: this.#normalizeString(el.name),
        image: this.#formatImage(el.productionDeployment.id),
      };
    });

    return processedProjects;
    } catch (err)
    {
      return `Error trying to fetch url: ${url}, error message: ${err}`
    }
    
  }


  find(url) {
    return this.#getProjects(url);
  }
}
module.exports = VercelService;
