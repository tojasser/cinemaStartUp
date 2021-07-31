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

        $(article).each((parentIndx, parentElm) =>{ // movies loop 
        console.log(`articale counter: ${parentIndx}`)
        //console.log($(parentElm).children().attr('href'))
        // console.log($(article).text())


        $(parentElm).children().each((childIndx, chaildElm) => {
            console.log(`child indx ${childIndx}`)

            if (childIndx === 0 ){  // parsing movie info 
                console.log($(chaildElm).children().attr('data-src'))
                const movieInfo = chaildElm
                $(movieInfo).find('aside > div').children().each((divIndx, divElm) =>{
                    console.log(`movie info indx: ${divIndx}`)
                    console.log($(divElm).text())
                })
                //console.log($('h2').text())

            }else { // here is the beginggg of class:dates (places and showtimes)
                const shows = chaildElm
                $(shows).find('div > h3').each((lvl3Indx,lvl3Elm) =>{
        
                    
                    console.log(`lvl3 indx ${lvl3Indx}`)
                    console.log($(lvl3Elm).text())
                    //console.log($(lvl3Elm).next().text())
                    $(lvl3Elm).next().find('li > ol > li > a').each((lvl4Indx, lvl4Elm) => { // parse movie time and showtime link

                        console.log($(lvl4Elm).text())
                        console.log($(lvl4Elm).attr('href'))
                    })

                })

            }

            //console.log($(chaildElm).children().text())
           // body > div.container > main > section.showtimes > article:nth-child(3) > div
   
        })

        })

        

    } catch(err){
        console.log(err)
    }
}
moviesAndShowtimes()