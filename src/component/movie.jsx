import React, { Component } from "react";
import { Button } from 'antd';
import axios from "axios";
// we can import the JS file for the parse

class Movie extends Component {
  constructor(props) {
    super(props);
    this.state = { movie: [] };
  }

  componentDidMount() {
    axios.get(`http://localhost:5000/movies`).then((response) => {
      this.setState({
        movie: response.data
      });
    });
  }






  render() {
    console.log(this.state.movie);
    return (
      <div className="App">
        <Button type="primary">Button</Button>
      </div>
    );
  }

}

export default Movie;
