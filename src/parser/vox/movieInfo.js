const axios = require('axios')
const cheerio = require('cheerio')
const { children, next } = require('cheerio/lib/api/traversing')

async function moviesAndShowtimes(){

    try{
        const siteUrl = 'https://ksa.voxcinemas.com/showtimes?c=al-qasr-mall-riyadh&c=atyaf-mall-riyadh&c=kingdom-centre-riyadh&c=riyadh-front-riyadh&c=riyadh-park-riyadh&c=sahara-mall-riyadh&c=the-roof-riyadh&c=the-spot-sheikh-jaber-riyadh'

        const {  data  } = await axios({
            method: "GET",
            url: siteUrl,
        })
        //console.log(data.data)
        const $ = cheerio.load(data)
        const article = 'body > div.container > main > section.showtimes > article'
        const movieArr = []
        $(article).each((parentIndx, parentElm) =>{ // movies loop 
        //console.log(`articale counter: ${parentIndx}`)
        //console.log($(parentElm).children().attr('href'))
        // console.log($(article).text())


        $(parentElm).children().each((childIndx, chaildElm) => {
            //console.log(`child indx ${childIndx}`)
            const movieObj = {}
            if (childIndx === 0 ){  // parsing movie info 
                const movieInfo = chaildElm 
                
                movieObj.poster = $(chaildElm).children().attr('data-src')
                $(movieInfo).find('aside > div').children().each((divIndx, divElm) =>{
                    //console.log(`movie info indx: ${divIndx}`)
                    movieObj.name = divIndx ===0 ? $(divElm).text() : movieObj.name   
                    movieObj.classification = divIndx ===1 ? $(divElm).text() : movieObj.classification   
                    movieObj.lang = divIndx ===2 ? $(divElm).text() : movieObj.lang   
                    movieObj.time = divIndx ===3 ? $(divElm).text() : movieObj.time   
                   
                    // console.log($(divElm).text())
                })
                //console.log(movieObj)
                
                //console.log($('h2').text())

            }else { // here is the beginggg of class:dates (places and showtimes)
                movieObj.showTimes = []
                const shows = chaildElm
                $(shows).find('div > h3').each((lvl3Indx,lvl3Elm) =>{
                        
                    //console.log(`lvl3 indx ${lvl3Indx}`)
                    const place = $(lvl3Elm).text()
                    //console.log($(lvl3Elm).next().text()+"test11")

                    const showTime = {}
                    showTime.place = place
                    showTime.times = []
                    $(lvl3Elm).next().find('li > ol > li > a').each((lvl4Indx, lvl4Elm) => { // parse movie time and showtime link
                        const time = $(lvl4Elm).text()
                        const href = $(lvl4Elm).attr('href')
                        showTime.times.push(time,href)
                    })
                    movieObj.showTimes.push(showTime)
                })
           
            }
            movieArr.push(movieObj)

            //console.log($(chaildElm).children().text())
           // body > div.container > main > section.showtimes > article:nth-child(3) > div
   
        })

        })
        // console.log("--------------------------------------------")
        // console.log(JSON.stringify(movieArr))
        return movieArr
    } catch(err){
        console.log(err)
    }
}


// moviesAndShowtimes()

async function show() {
    const moview = await moviesAndShowtimes()
    console.log("--------------------------------------------")
    console.log("--------------------------------------------")
    console.log("--------------------------------------------")

    console.log(JSON.stringify(moview));
}

show()


