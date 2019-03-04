import React, { Component } from "react";
import "./HomeStyle.css";
import '../components/SearchField';
// import APIKEY from "./apiKeys";
import Times from './unixTimes';
import SearchField from "../components/SearchField";
import BottomRow from '../components/BottomRow';
import Axios from 'axios';

class Home extends Component {
  state = {
    search: "",
    searchTerm: "",
    readyToSearch: true
  };

  handleInputChange = event => {
    const { name, value } = event.target;
    this.setState({ [name]: value });
  }

  getAverageWeather = weatherHistoryData => {
    let convertedWeatherData = [];
    console.log("Weather History Data: ", weatherHistoryData);
    if (weatherHistoryData.length % 3 === 0) {
      for (let i = 0; i < weatherHistoryData.length; i++) {
        if (i === 0 || i % 3 === 0) {
          let newObj = {
            apparentTemperatureHigh: (weatherHistoryData[i].apparentTemperatureHigh + weatherHistoryData[i + 1].apparentTemperatureHigh + weatherHistoryData[i + 2].apparentTemperatureHigh) / 3,
            apparentTemperatureLow: (weatherHistoryData[i].apparentTemperatureLow + weatherHistoryData[i + 1].apparentTemperatureLow + weatherHistoryData[i + 2].apparentTemperatureLow) / 3,
            apparentTemperatureMax: (weatherHistoryData[i].apparentTemperatureMax + weatherHistoryData[i + 1].apparentTemperatureMax + weatherHistoryData[i + 2].apparentTemperatureMax) / 3,
            apparentTemperatureMin: (weatherHistoryData[i].apparentTemperatureMin + weatherHistoryData[i + 1].apparentTemperatureMin + weatherHistoryData[i + 2].apparentTemperatureMin) / 3,
            cloudCover: (weatherHistoryData[i].cloudCover + weatherHistoryData[i + 1].cloudCover + weatherHistoryData[i + 2].cloudCover) / 3,
            dewPoint: (weatherHistoryData[i].dewPoint + weatherHistoryData[i + 1].dewPoint + weatherHistoryData[i + 2].dewPoint) / 3,
            humidity: (weatherHistoryData[i].humidity + weatherHistoryData[i + 1].humidity + weatherHistoryData[i + 2].humidity) / 3,
            precipIntensity: (weatherHistoryData[i].precipIntensity + weatherHistoryData[i + 1].precipIntensity + weatherHistoryData[i + 2].precipIntensity) / 3,
            precipIntensityMax: (weatherHistoryData[i].precipIntensityMax + weatherHistoryData[i + 1].precipIntensityMax + weatherHistoryData[i + 2].precipIntensityMax) / 3,
            precipProbability: (weatherHistoryData[i].precipProbability + weatherHistoryData[i + 1].precipProbability + weatherHistoryData[i + 2].precipProbability) / 3,
            pressure: (weatherHistoryData[i].pressure + weatherHistoryData[i + 1].pressure + weatherHistoryData[i + 2].pressure) / 3,
            temperatureHigh: (weatherHistoryData[i].temperatureHigh + weatherHistoryData[i + 1].temperatureHigh + weatherHistoryData[i + 2].temperatureHigh) / 3,
            temperatureLow: (weatherHistoryData[i].temperatureLow + weatherHistoryData[i + 1].temperatureLow + weatherHistoryData[i + 2].temperatureLow) / 3,
            temperatureMax: (weatherHistoryData[i].temperatureMax + weatherHistoryData[i + 1].temperatureMax + weatherHistoryData[i + 2].temperatureMax) / 3,
            temperatureMin: (weatherHistoryData[i].temperatureMin + weatherHistoryData[i + 1].temperatureMin + weatherHistoryData[i + 2].temperatureMin) / 3,
            uvIndex: (weatherHistoryData[i].uvIndex + weatherHistoryData[i + 1].uvIndex + weatherHistoryData[i + 2].uvIndex) / 3,
            visibility: (weatherHistoryData[i].visibility + weatherHistoryData[i + 1].visibility + weatherHistoryData[i + 2].visibility) / 3,
            windGust: (weatherHistoryData[i].windGust + weatherHistoryData[i + 1].windGust + weatherHistoryData[i + 2].windGust) / 3,
            windSpeed: (weatherHistoryData[i].windSpeed + weatherHistoryData[i + 1].windSpeed + weatherHistoryData[i + 2].windSpeed) / 3
          }
          convertedWeatherData.push(newObj);
        }
      }
      console.log("Data averages: ", convertedWeatherData);
      this.setState({ weatherAverages: convertedWeatherData, readyToSearch: true });
    } else {
      alert("Data has not been fetched properly. Cannot be displayed. Please try again.");
      this.setState({ readyToSearch: true });
      return;
    }
  }

  searchThis = event => {
    event.preventDefault();
    this.setState({ readyToSearch: false });
    console.log(`Search for: ${this.state.search}`);
    let weatherHistoryData = [];
    Axios.get(`https://api.opencagedata.com/geocode/v1/json?q=${this.state.search}&key=352a681eeea64cbeb49f0df280f14edc`)
      .then(data => {
        let { lat, lng } = data.data.results[0].geometry;
        this.setState({ lat: lat, lng: lng });
        for (let i = 0; i < Times.times.length; i++) {
          Axios.get(`https://cors-anywhere.herokuapp.com/https://api.darksky.net/forecast/0c5ce774505eb65bf076f514cf46c7fe/${lat},${lng},${Times.times[i]}?exclude=hourly,currently,flags`)
            .then(data => {
              weatherHistoryData.push(data.data.daily.data[0]);
              if (i === (Times.times.length - 1)) {
                this.getAverageWeather(weatherHistoryData);
              }
            })
        }
      })
      .catch(err => console.log(err));
  }

  canSearch = () => {
    if (this.state.readyToSearch) {
      return (
        <SearchField value={this.state.search} handleInputChange={this.handleInputChange} onSubmit={this.searchThis} />
      )
    } else {
      return;
    }
  }

  render() {
    return (
      <>
        <div id="summary">
          <p id="intro">Welcome to the Climate Change App. This website was created under the inspiration of global climate change. We sought out a way to figure out how global climate change was affecting your region, since not all parts of the globe are impacted in the same way with the Earth's ever-drastically-changing climate. With our new website, we hope to be able to improve your understanding of how climate change is affecting your region.</p>
          <p id="credit">By, Chris Castro and Tola Kasali</p>
        </div>
        {this.canSearch()}
        <BottomRow latlng={{ lat: this.state.lat, lng: this.state.lng }} weatherAverages={this.state.weatherAverages} />
      </>
    );
  }
}

export default Home;