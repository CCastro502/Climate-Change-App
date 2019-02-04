import React, { Component } from "react";
import '../components/SearchField';
import APIKEY from "./apiKeys";
import Times from './unixTimes';
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
    let weatherHistoryData = [];
    Axios.get("https://api.opencagedata.com/geocode/v1/json?q=" + this.state.search + "&key=" + APIKEY.cageAPIKey)
      .then(data => {
        let { lat, lng } = data.data.results[0].geometry;
        this.setState({ lat: lat, lng: lng });
        for (let i = 0; i < Times.times.length; i++) {
          Axios.get(`https://cors-anywhere.herokuapp.com/https://api.darksky.net/forecast/${APIKEY.darkSkyAPIKey}/${lat},${lng},${Times.times[i]}?exclude=hourly,currently,flags`).then(data => {
            weatherHistoryData.push(data);
          })
        }
        console.log(weatherHistoryData);
      })
      .catch(err => console.log(err))
  }

  render() {
    return (
      <>
        <SearchField value={this.state.search} handleInputChange={this.handleInputChange} onSubmit={this.searchThis} />
        <BottomRow lat={this.state.lat} lng={this.state.lng} />
      </>
    );
  }
}

export default Home;