const puppeteer = require("puppeteer");

const homePage = "https://ksa.voxcinemas.com/movies/whatson";
const showTimes = "https://ksa.voxcinemas.com/showtimes?c=al-qasr-mall-riyadh&c=atyaf-mall-riyadh&c=kingdom-centre-riyadh&c=riyadh-front-riyadh&c=riyadh-park-riyadh&c=sahara-mall-riyadh&c=the-roof-riyadh&c=the-spot-sheikh-jaber-riyadh";

//db 
const { MongoClient } = require('mongodb');
const uri = "mongodb+srv://Movies:StartUp1122@movie.asfrf.mongodb.net/myFirstDatabase?retryWrites=true&w=majority";
const client = new MongoClient(uri, { useNewUrlParser: true, useUnifiedTopology: true });
client.connect(err => {
  const collection = client.db("test").collection("devices");
  console.log("Done");
  // perform actions on the collection object





(async function main() {
  
  const browser = await puppeteer.launch();
  const page = await browser.newPage();

  await page.goto(homePage);
  await page.waitForSelector(".movie-summary");

  const movies = await page.$$(".movie-summary");

  let m = [];

  await Promise.all(movies.map(async (movie) => {
    let p = await movie.$eval('.poster', (img) => img.getAttribute('data-src'));
    let lang = await movie.$eval(".language", (p) => p.innerText);
    m.push({
      Name: await movie.$eval("h3", (h3) => h3.innerText),
      classification: await movie.$eval("p", (p) => p.innerText),
      Language: lang.substr(10),
      poster: p == null || p.startsWith("/assets") ? await movie.$eval('.poster', (img) => img.getAttribute('src')) : p
    });
  }));

  
  console.log(m);
  //save db 
collection.insertOne(m)
  .then(function(result) {
    console.log("saved");
    // process result
  })
  .catch(err);

  await browser.close();
})();
client.close();

});

// (async function main() {
  
//   const browser = await puppeteer.launch();
//   const page = await browser.newPage();

//   await page.goto(showTimes);
//   await page.waitForSelector(".movie-hero");

//   const voxMovieShowTime = await page.$$(".movie-compare");
//   let voxListShowTimes = [];
  
//   await Promise.all(voxMovieShowTime.map(async (movie) => {
//     voxListShowTimes.push({
//       MovieName: await movie.$eval(".movie-hero>div>h2",(h2)=> h2.innerText),
//       MovieTime: await movie.$eval('.movie-hero>div>span:nth-child(4)',(a)=> a.innerText),
//       Place: await movie.$eval(".highlight", (h3)=> h3.innerText),
//       showRoom: await movie.$eval(".dates>ol>li>strong", (text)=> text.innerText),

//     });
//   }));
//   console.log(voxListShowTimes);
//   await browser.close();
// })();
