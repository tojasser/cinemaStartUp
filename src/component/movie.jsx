import React, { Component } from "react";
import axios from "axios";
import logo from "./cinema.png";
import vox from "./vox.png";
import { Button } from "bootstrap";

class Movie extends Component {
  constructor(props) {
    super(props);
    this.state = {
      movie: [],
      isModalVisible: false,
    };
  }

  componentDidMount() {
    axios.get(`http://localhost:5000/movies`).then((response) => {
      this.setState({
        movie: response.data,
      });
    });
  }

  showModal = () => {
    this.setState({
      isModalVisible: true,
    });
  };

  handleCancel = () => {
    this.setState({
      isModalVisible: false,
    });
  };

  render() {
    const movie = this.state.movie;
    const baseVoxUrl = "https://ksa.voxcinemas.com";
    return (
      <div className="container">
        <div className="logo">
          <img src={logo} alt="logo"></img>
        </div>
        <p>Find all now showing movies in your city in one place!</p>
        <div className="rapper">
          <div className="select-city">
            <p>Choose City</p>
            <Button className="selected">Riyadh</Button>
            <Button>Jeddah</Button>
            <Button>Dammam</Button>
            <Button>Qassim</Button>
            {/* <Select
              showSearch
              style={{ width: 200 }}
              placeholder="Another city..."
            /> */}
            <Button block className="find">
              Find Movies
            </Button>
          </div>
        </div>
        <div className="rapper">
          <div className="row">
            {movie.map((mov, index) => (
              <div className="col-6 gutter-row">
                {/* <Card>
                  <Grid relaxed columns={4}>
                    <Grid.Column>
                      <Image
                        src={mov.poster}
                        style={{
                          maxWidth: "100%",
                          borderTopRightRadius: "8px",
                          borderTopLeftRadius: "8px",
                        }}
                      />
                    </Grid.Column>
                  </Grid>

                  <Card.Content>
                    <Card.Header>{mov.name}</Card.Header>
                    <Card.Meta>{mov.classification}</Card.Meta>
                    <Card.Description>{mov.lang}</Card.Description>
                    <Card.Description>{mov.time}</Card.Description>
                  </Card.Content>
                  <Card.Content extra>
                    <a>
                      <Icon name="user" />
                    </a>
                  </Card.Content>
                </Card>

                <Button
                  className="showtime-btn"
                  id={index}
                  type="primary"
                  onClick={this.showModal}
                >
                  Show Times
                </Button>
                <Modal
                  title="Showtimes"
                  visible={this.state.isModalVisible}
                  onCancel={this.handleCancel}
                >
                  <div className="showtime">
                    <div className="vox-logo">
                    <img src={vox} alt="logo"></img>
                    </div>
                    {mov.showTimes.map((location,index) => (
                      <Col>
                        <h2>{location.place}</h2>
                        {location.times.map((show, index) => (
                          <li>
                            <Button className="showtime-btn" href={baseVoxUrl + show.link}>
                              {show.time}
                            </Button>
                          </li>
                        ))}
                      </Col>
                    ))}
                  </div>
                </Modal> */}
              </div>
            ))}
          </div>
        </div>
      </div>
    );
  }
}

export default Movie;
