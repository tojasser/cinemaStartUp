// const express = require('express');
// var cors = require('cors')
// const app = express();
const axios = require('axios')
const cheerio = require('cheerio');
const { json } = require('express/lib/response');
// const port = process.env.PORT || 5000;
// app.use(cors())

exports.handler = async ( context) =>{


    try{

        let movie = await moviesAndShowtimes();
        return{
            statusCode: 200,
            body: movie
        }

    }catch(error) {
        return{
            statusCode: 500,
            body: JSON.stringify(error)
        }

    }
};



// This displays message that the server running and listening to specified port
// app.listen(port, () => console.log(`Listening on port ${port}`));

// // create a GET Moives route
// app.get('/movies', async (req, res) => {
//     let movie = await moviesAndShowtimes();
//     res.end(movie);
// });


// const getMovies = async () => {

//     try {
//         const siteUrl = 'https://ksa.voxcinemas.com/movies/whatson'

//         const {
//             data
//         } = await axios({
//             method: 'GET',
//             url: siteUrl,
//         })

//         const keys = [
//             'poster',
//             'name',
//             'classification',
//             'language',
//             'showtime',
//         ]

//         const movieArr = []
//         const $ = cheerio.load(data)
//         const elmSelector = 'body > div.container > main > section.now-showing > article'
//         $(elmSelector).each((parentIndx, parentElm) => {
//             let keyIndx = 0
//             const movieObj = {}
//             //console.log(`movie index ${parentIndx}`)
//             $(parentElm).children().each((childIdx, childElm) => {
//                 // console.log(childIdx)

//                 let movie = $(childElm).text()

//                 if (childIdx === 0) {
//                     movie = $(childElm).children().attr('data-src')
//                     //    console.log($(childElm).children().attr('src'))
//                 }
//                 if (childIdx === 4) {
//                     movie = $(childElm).attr('href')
//                     //          console.log($(childElm).attr('href'))

//                 }

//                 if (movie) {
//                     movieObj[keys[keyIndx]] = movie
//                     //console.log(keyIndx)
//                     keyIndx++
//                 }


//             })

//             movieArr.push(movieObj)


//         })

//         console.log(movieArr)
//         return JSON.stringify(movieArr);

//     } catch (err) {
//         console.log(err)
//         return JSON.stringify(err);
//     }
// }

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


            //const movieObj = {}// { poster:'',name:'', classification:'', lang:'', time:'', shows:[]}
            const movieObj = {}
            $(parentElm).children().each((childIndx, chaildElm) => {
                //console.log(`child indx ${childIndx}`)
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
                    movieObj.showTimes = []
                    const shows = chaildElm
                    $(shows).find('div > h3').each((lvl3Indx, lvl3Elm) => {

                        //console.log(`lvl3 indx ${lvl3Indx}`)
                        const place = $(lvl3Elm).text()
                        //console.log($(lvl3Elm).next().text()+"test11")

                        const showTime = {}
                        showTime.place = place
                        showTime.times = []
                        $(lvl3Elm).next().find('li > ol > li > a').each((lvl4Indx, lvl4Elm) => { // parse movie time and showtime link
                            const timesshowe = {}
                            timesshowe.time = $(lvl4Elm).text()
                            timesshowe.link = $(lvl4Elm).attr('href')
                            showTime.times.push(timesshowe)
                        })
                        movieObj.showTimes.push(showTime)
                    })

                }
                
                //console.log($(chaildElm).children().text())
                // body > div.container > main > section.showtimes > article:nth-child(3) > div
                
            })
            movieArr.push((movieObj))

        })
        return (JSON.stringify(movieArr))
    } catch (err) {
        JSON.stringify(err)
    }
}

