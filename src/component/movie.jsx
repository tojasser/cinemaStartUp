import React, { Component } from "react";
import { Button, Col, Row, Select } from "antd";
import axios from "axios";
import logo from "./cinema.png";

class Movie extends Component {
  constructor(props) {
    super(props);
    this.state = { movie: [] };
  }

  componentDidMount() {
    axios.get(`http://localhost:5000/movies`).then((response) => {
      this.setState({
        movie: response.data,
      });
    });
  }

  render() {
    console.log(this.state.movie);
    return (
      <div className="container">
        <div className="logo">
          <img src={logo} alt="logo"></img>
        </div>
        <p>Find all now showing movies in your city in one place!</p>
        <div className="rapper">
          <div className="select-city">
            <p>Choose City</p>
            <Button>Riyadh</Button>
            <Button>Jeddah</Button>
            <Button>Dammam</Button>
            <Button>Qassim</Button>
            <Select
              showSearch
              style={{ width: 200 }}
              placeholder="Another city..."
            />
            <Button block className="find">Find Movies</Button>
          </div>
        </div>
      </div>
    );
  }
}

export default Movie;
