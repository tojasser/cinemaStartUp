import React, { Component } from "react";
import { Button, Col, Row, Select, Divider, Modal } from "antd";
import { Card, Grid, Icon, Image } from "semantic-ui-react";
import axios from "axios";
import logo from "./cinema.png";
import vox from "./vox.png";
import { Collapse } from 'antd';
import { CaretRightOutlined } from '@ant-design/icons';

const { Panel } = Collapse;


class Movie extends Component {
  constructor(props) {
    super(props);
    this.state = {
      visible: false,
      movie: []
    };
  }

  showModal = () => {
    this.setState({
      visible: true,
    });
  }
  
  handleCancel = (e) => {
    console.log(e);
    this.setState({
      visible: false,
    });
  }

  handleOk = (e) => {
    console.log(e);
    this.setState({
      visible: false,
    });
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
    const baseLink = "https://ksa.voxcinemas.com"

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
                <div>
                  <Button type="primary" onClick={this.showModal}>SHOWTIME</Button>
                  <Modal
                    // title="Basic Modal"
                    visible={this.state.visible}
                    onCancel={this.handleCancel}
                    footer={null}
                  >
                    <div className="showtime">
                      <img src={vox} height="42" width="42"></img>
                      {mov.showTimes.map((location) => (
                        <Col>
                          <p>{location.place}</p>
                          {location.times.map((show) => (
                              <a href={baseLink+show.link}>{show.time}</a>
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
                  </Modal>
                </div>
              </Col>
            ))}
          </Row>
        </div>
      </div>
    );
  }
}

export default Movie;
