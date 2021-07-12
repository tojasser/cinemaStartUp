const puppeteer = require("puppeteer");

const url = "https://ksa.voxcinemas.com/movies/whatson";

(async function main() {
  const browser = await puppeteer.launch();
  const page = await browser.newPage();

  await page.goto(url);
  await page.waitForSelector(".movie-summary");

  const movies = await page.$$(".movie-summary");

  let mov = { Name: "", classification: "", lang: "" };

  for (const movie of movies) {
    mov.Name = await movie.$eval("h3", (h3) => h3.innerText);
    mov.classification = await movie.$eval("p", (p) => p.innerText);
    mov.lang = await movie.$eval(".language", (p) => p.innerText);
    console.log(JSON.stringify(mov));
  }

  await browser.close();
})();
