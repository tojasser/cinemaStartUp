import React, { Component } from "react";
import { Button } from 'antd';
import { getMovies } from "../parser/vox/movieService";
// we can import the JS file for the parse

class Movie extends Component {
  /*
    here we will passing the movie object to the state to use it in the JSX  
    */
  state = { movie: [] };
  componentDidMount(){
    getMovies();
  }

  render() {
    return (
      <div className="App">
        <Button type="primary">Button</Button>
      </div>
    );
  }
}

export default Movie;
