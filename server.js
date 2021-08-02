const express = require('express'); 
var cors = require('cors')
const app = express(); 
const axios = require('axios')
const cheerio = require('cheerio')
const port = process.env.PORT || 5000; 
app.use(cors())


// This displays message that the server running and listening to specified port
app.listen(port, () => console.log(`Listening on port ${port}`)); 

// create a GET route
app.get('/movies', async (req, res) => {
  let m = await getMovies();
  res.end(m); 
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
        return err;
    }
}
