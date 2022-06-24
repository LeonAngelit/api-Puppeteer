const puppeteer = require('puppeteer');

class CourseService {
  constructor() {
    this.courses = [];
  }

  async getCourses(url, userName) {
    let browser = await puppeteer.launch({args: ['--no-sandbox']});

    try {
      let page = await browser.newPage();
      await page.setExtraHTTPHeaders({
        'Accept-Language': 'en-US,en;q=0.9',
      });
      await page.setUserAgent(
        'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/66.0.3359.181 Safari/537.36'
      );
      await page.goto(`${url}${userName}`);
      this.courses = await page.evaluate(() => {
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
      });
    } catch (error) {
      console.log(error);
    } finally {
      await browser.close();
    }
    return this.courses;
  }

  find(url, userName) {
    return this.getCourses(url, userName);
  }
}

module.exports = CourseService;
