import React, { Component } from "react";
const axios = require("axios");
const cheerio = require("cheerio");
// we can import the JS file for the parse

class Movie extends Component {
  /*
    here we will passing the movie object to the state to use it in the JSX  
    */
  state = { movie: [] };

  async getMovies() {
    try {
      const siteUrl = "https://ksa.voxcinemas.com/movies/whatson";

      const { data } = await axios({
        method: "GET",
        url: siteUrl,
      });

      const keys = ["poster", "name", "classification", "language", "showtime"];

      const movieArr = [];
      const $ = cheerio.load(data);
      const elmSelector =
        "body > div.container > main > section.now-showing > article";
      $(elmSelector).each((parentIndx, parentElm) => {
        let keyIndx = 0;
        const movieObj = {};
        //console.log(`movie index ${parentIndx}`)
        $(parentElm)
          .children()
          .each((childIdx, childElm) => {
            // console.log(childIdx)

            let movie = $(childElm).text();

            if (childIdx === 0) {
              movie = $(childElm).children().attr("src");
              //    console.log($(childElm).children().attr('src'))
            }
            if (childIdx === 4) {
              movie = $(childElm).attr("href");
              //          console.log($(childElm).attr('href'))
            }

            if (movie) {
              movieObj[keys[keyIndx]] = movie;
              //console.log(keyIndx)
              keyIndx++;
            }
          });

        movieArr.push(movieObj);
      });

      console.log(movieArr);
      this.setState({
          movie: movieArr
      });
    } catch (err) {
      console.log(err);
    }
  }

  render() {
      this.getMovies();
      console.log(this.state)
    return (
      <div>
        {this.state.movie}
        <h1>Movie</h1>
        <button>press</button>
      </div>
    );
  }
}

export default Movie;
