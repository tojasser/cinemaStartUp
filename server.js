const express = require('express');
var cors = require('cors')
const app = express();
const axios = require('axios')
const cheerio = require('cheerio')
const port = process.env.PORT || 5000;
app.use(cors())


// This displays message that the server running and listening to specified port
app.listen(port, () => console.log(`Listening on port ${port}`));

// create a GET Moives route
app.get('/movies', async (req, res) => {
            console.log("be")
    let movie = await moviesAndShowtimes();
    console.log("aft")
    console.log(movie)
    res.end(movie);
});

// create a GET showtime route
app.get('/showtimes', async (req, res) => {
    let showtime = await moviesAndShowtimes();
    res.end(showtime);
});


const getMovies = async () => {

    try {
        const siteUrl = 'https://ksa.voxcinemas.com/movies/whatson'

        const {
            data
        } = await axios({
            method: 'GET',
            url: siteUrl,
        })

        const keys = [
            'poster',
            'name',
            'classification',
            'language',
            'showtime',
        ]

        const movieArr = []
        const $ = cheerio.load(data)
        const elmSelector = 'body > div.container > main > section.now-showing > article'
        $(elmSelector).each((parentIndx, parentElm) => {
            let keyIndx = 0
            const movieObj = {}
            //console.log(`movie index ${parentIndx}`)
            $(parentElm).children().each((childIdx, childElm) => {
                // console.log(childIdx)

                let movie = $(childElm).text()

                if (childIdx === 0) {
                    movie = $(childElm).children().attr('data-src')
                    //    console.log($(childElm).children().attr('src'))
                }
                if (childIdx === 4) {
                    movie = $(childElm).attr('href')
                    //          console.log($(childElm).attr('href'))

                }

                if (movie) {
                    movieObj[keys[keyIndx]] = movie
                    //console.log(keyIndx)
                    keyIndx++
                }


            })

            movieArr.push(movieObj)


        })

        console.log(movieArr)
        return JSON.stringify(movieArr);

    } catch (err) {
        console.log(err)
        return JSON.stringify(err);
    }
}

const moviesAndShowtimes = async ()=> {
    debugger

    try {
        const siteUrl = 'https://ksa.voxcinemas.com/showtimes?c=al-qasr-mall-riyadh&c=atyaf-mall-riyadh&c=kingdom-centre-riyadh&c=riyadh-front-riyadh&c=riyadh-park-riyadh&c=sahara-mall-riyadh&c=the-roof-riyadh&c=the-spot-sheikh-jaber-riyadh'

        const {
            data
        } = await axios({
            method: "GET",
            url: siteUrl,
        })
        //console.log(data.data)
        const $ = cheerio.load(data)
        const article = 'body > div.container > main > section.showtimes > article'
        const movieArr = []
        $(article).each((parentIndx, parentElm) => { // movies loop 
            //console.log(`articale counter: ${parentIndx}`)
            //console.log($(parentElm).children().attr('href'))
            // console.log($(article).text())

            const movieObj = {name:'', classification:'', lang:'', time:'', poster:'', shows:[]}
            $(parentElm).children().each((childIndx, chaildElm) => {
                //console.log(`child indx ${childIndx}`)
                const movieObj = {}
                if (childIndx === 0) { // parsing movie info 
                    const movieInfo = chaildElm

                    movieObj.poster = $(chaildElm).children().attr('data-src')
                    $(movieInfo).find('aside > div').children().each((divIndx, divElm) => {
                        //console.log(`movie info indx: ${divIndx}`)
                        movieObj.name = divIndx === 0 ? $(divElm).text() : movieObj.name
                        movieObj.classification = divIndx === 1 ? $(divElm).text() : movieObj.classification
                        movieObj.lang = divIndx === 2 ? $(divElm).text() : movieObj.lang
                        movieObj.time = divIndx === 3 ? $(divElm).text() : movieObj.time

                        // console.log($(divElm).text())
                    })
                    //console.log(movieObj)

                    //console.log($('h2').text())

                } else { // here is the beginggg of class:dates (places and showtimes)
                    const shows = chaildElm
                    $(shows).find('div > h3').each((lvl3Indx, lvl3Elm) => {
                        const place = $(lvl3Elm).text()
                        const showTime = {}
                        showTime.place = place
                        showTime.times = []
                        $(lvl3Elm).next().find('li > ol > li > a').each((lvl4Indx, lvl4Elm) => { // parse movie time and showtime link
                            const times = {}
                            times.time = $(lvl4Elm).text()
                            times.link = $(lvl4Elm).attr('href')
                            showTime.times.push(times)
                        })
                        movieObj.showTimes.push(showTime)
                    })
                }
            })
            movieArr.push(movieObj)

        })
        return JSON.parse(JSON.stringify(movieArr))
    } catch (err) {
        JSON.stringify(err)
    }
}

