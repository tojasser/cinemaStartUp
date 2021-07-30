const axios = require('axios')
const cheerio = require('cheerio')

async function getMovies(){

    try{
        const siteUrl = 'https://ksa.voxcinemas.com/movies/whatson'

        const { data } = await axios({
            method:'GET',
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
            $(parentElm).children().each((childIdx,childElm) => {
               // console.log(childIdx)

               let movie = $(childElm).text()

               if(childIdx === 0){
                   movie  = $(childElm).children().attr('data-src')
                //    console.log($(childElm).children().attr('src'))
               }
               if(childIdx === 4){
                   movie = $(childElm).attr('href')
                //          console.log($(childElm).attr('href'))

               }

               if(movie){
                   movieObj[keys[keyIndx]] = movie
                   //console.log(keyIndx)
                   keyIndx++
               }
       
            
            })

            movieArr.push(movieObj)

    
            })
        
            console.log(movieArr)
         
    }catch(err){
        console.log(err)
    }
}

return getMovies()