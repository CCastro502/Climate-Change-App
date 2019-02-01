import React, { Component } from "react";
import '../components/SearchField';
import SearchField from "../components/SearchField";
import BottomRow from '../components/BottomRow';
import Axios from 'axios';

class Home extends Component {
  state = {
    search: ""
  }

  handleInputChange = event => {
    const { name, value } = event.target;
    this.setState({ [name]: value });
  }

  searchThis = event => {
    event.preventDefault();
    console.log(`Search for: ${this.state.search}`);
    Axios.get("https://api.opencagedata.com/geocode/v1/json?q=" + this.state.search + "&key=352a681eeea64cbeb49f0df280f14edc")
      .then(data => {
        let { lat, lng } = data.data.results[0].geometry;
        this.setState({ lat: lat, lng: lng });
        Axios.get(`http://api.worldweatheronline.com/premium/v1/weather.ashx?key=67622c5539b8479284f172322193001&q=${lat},${lng}&num_of_days=2&tp=24&format=json`).then(data => {
          console.log(data.data);
        })
      })
      .catch(err => console.log(err))
  }

  render() {
    return (
      <>
        <SearchField value={this.state.search} handleInputChange={this.handleInputChange} onSubmit={this.searchThis} />
        <BottomRow lat={this.state.lat} lng={this.state.lng}/>
      </>
    );
  }
}

export default Home;