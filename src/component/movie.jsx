import React, { Component } from "react";
import { Button, Col, Row, Select, Divider } from "antd";
import { Card, Grid, Icon, Image } from "semantic-ui-react";
import axios from "axios";
import logo from "./cinema.png"; import { Collapse } from 'antd';
import { CaretRightOutlined } from '@ant-design/icons';

const { Panel } = Collapse;


class Movie extends Component {
  constructor(props) {
    super(props);
    this.state = {
      movie: []
    };
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
    const movie = this.state.movie;

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
            <Button block className="find">
              Find Movies
            </Button>
          </div>
          <Row gutter={{ xs: 8, sm: 16, md: 24, lg: 32 }}>
            {movie.map((mov, index) => (
              <Col className="gutter-row" span={6}>
                <Card>
                  <Grid relaxed columns={4}>
                    <Grid.Column>
                      <Image
                        src={mov.poster}
                        style={{
                          maxWidth: "100%",
                          borderTopRightRadius: "8px",
                          borderTopLeftRadius: "8px"
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
                <Collapse
                        bordered={false}
                        expandIcon={({ isActive }) => <CaretRightOutlined rotate={isActive ? 90 : 0} />}
                        className="site-collapse-custom-collapse"
                      >
                        <Panel header="Showtimes" key={index} className="site-collapse-custom-panel">
                          <div className="showtime">
                          {mov.showTimes.map((location) => (
                              <Col>
                              <p>{location.place}</p>
                              {location.times.map((show) => (
                              <li>
                                <a href={show.link}>{show.time}</a>
                                </li>
                              ))}
                              {/* 
                              <Button
                                onClick={this.onClick}
                                href={"https://ksa.voxcinemas.com/" + mov.showtime}
                              >
                              </Button> */}
                              </Col>
                          ))}
                          </div>
                        </Panel>
                      </Collapse>
              </Col>
            ))}
          </Row>
        </div>
      </div>
    );
  }
}

export default Movie;
