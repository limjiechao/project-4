// ############### React ###############
import React, { Component } from 'react';
import {
  Container,
  Row,
  Col,
  Input,
  Label,
  Form,
  FormGroup
} from 'reactstrap';

// ############### Components ###############
import Locations from './Locations'
import Dates from './Dates'
import Itinerary from './Itinerary'
import PlacesWithStandaloneSearchBox from './SearchBox';

// ############### Styling ###############
import '../styles/App.css'
import logo from '../icon.png'



class App extends Component {

  // Constructors
  constructor() {
    super();
    this.state = {
      locationList: []
    };
  }

  // Test Code

  addToList = async ({ place_id, formatted_address, name, geometry: { location } }) => {
    // display on React client
    // var node = document.createElement("LI");
    // var textnode = document.createTextNode(`${name}, ${formatted_address} at ${location.lat()}, ${location.lng()}`);
    // node.appendChild(textnode);
    // document.getElementById("locationList").appendChild(node);

    // write to Express server
    var params = {
      id: place_id,
      name: name,
      address: formatted_address,
      latitude: location.lat(),
      longitude: location.lng()
    }
    console.log(params)
    const response = await fetch('/location/new', {
      method: 'POST',
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(params)
    })
    const body = await response.json()
    console.log(body)
    this.setState({ locationList: body })
  }

  retrieveFromList = async () => {
    const response = await fetch('/location/getAllForTrip');
    const body = await response.json();
    if (response.status !== 200) throw Error(body.message);
    this.setState({ locationList: body });
  };

  deleteFromList = async (id) => {
    console.log(id)
    const response = await fetch(`/location/delete/${id}`, {
      method: 'DELETE',
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json'
      },
    })
    const body = await response.json()
    this.setState({ locationList: body })
  }

  componentDidMount() {
    this.retrieveFromList();
  }

  // Event creation Test

  addToEvent = async (e, req) => {

    // write to Express server
    var params = {
      location_id: e.target.parentNode.id
      // trip_id: req.params.id,
      // name: this.state.locationList[e.target]
    };
    console.log(params);
    let response = await fetch('/event/new', {
      method: 'POST',
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(params)
    });
  };

  // End of Event Creation Test

  // Update Event Test
  updateEvent = async (e, req) => {

    // write to Express server
    var params = {
      // eventID: e.target.parentNode.id,
      description: 'Testing123',
      // Mock data to represent event ID
      id: '5a8bcdd420581688a8dcf1bf'
      // locationID: '5a8b8f5ec4e9267e17d6a63c'
      // trip_id: req.params.id,
      // name: this.state.locationList[e.target]
    };
    // console.log(e.target.parentNode)
    console.log(params);
    let response = await fetch(`/event/update/${params.id}`, {
      method: 'PUT',
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(params)
    });
  };
  // End of Update Event Test

  // Delete Event Test
  deleteEvent = async (e, req) => {

    // write to Express server
    var params = {
      // Mock data to represent event ID
      id: '5a8be2f709de0d8cbd9d2ece'
    };
    // console.log(e.target.parentNode)
    console.log(params);
    let response = await fetch(`/event/delete/${params.id}`, {
      method: 'DELETE',
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(params)
    });
  };

  // End of Test Code

  render() {
    return (
      <div className="main">
        <Container>
          <Row className="header">
            <Col className="col-8">
              <span>
                <img src={logo} className="logo"/>
              </span>
              <span className="title">TripCollab</span>
            </Col>
            <Col className="col-4">hello</Col>
          </Row>
          <Row>
            <Col className="col-7">
              <PlacesWithStandaloneSearchBox onAdd={this.addToList}/>
            </Col>
            <Col className="col-5">
              <Locations locations={this.state.locationList} onDelete={this.deleteFromList}/>
            </Col>
          </Row>

          <Row className="mt-5">
            <Col>
              <Dates/>
            </Col>
          </Row>

          <Row>
            <Col>
              <Itinerary/>
            </Col>
          </Row>
        </Container>
      </div>
    );
  }
}

export default App;
