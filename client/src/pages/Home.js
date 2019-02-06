import React, { Component } from "react";
import '../components/SearchField';
// import APIKEY from "./apiKeys";
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

  getAverageWeather = (weatherHistoryData) => {
    console.log("Weather history: ", weatherHistoryData);
    console.log(`Length: ${weatherHistoryData.length}`);
    let convertedWeatherData = [];
    for (let i = 0; i < weatherHistoryData.length; i++) {
      if (i === 0 || i % 2 === 0) {
        let newObj = {
          apparentTemperatureHigh: (weatherHistoryData[i].apparentTemperatureHigh + weatherHistoryData[i + 1].apparentTemperatureHigh) / 2,
          apparentTemperatureLow: (weatherHistoryData[i].apparentTemperatureLow + weatherHistoryData[i + 1].apparentTemperatureLow) / 2,
          apparentTemperatureMax: (weatherHistoryData[i].apparentTemperatureMax + weatherHistoryData[i + 1].apparentTemperatureMax) / 2,
          apparentTemperatureMin: (weatherHistoryData[i].apparentTemperatureMin + weatherHistoryData[i + 1].apparentTemperatureMin) / 2,
          cloudCover: (weatherHistoryData[i].cloudCover + weatherHistoryData[i + 1].cloudCover) / 2,
          dewPoint: (weatherHistoryData[i].dewPoint + weatherHistoryData[i + 1].dewPoint) / 2,
          humidity: (weatherHistoryData[i].humidity + weatherHistoryData[i + 1].humidity) / 2,
          precipIntensity: (weatherHistoryData[i].precipIntensity + weatherHistoryData[i + 1].precipIntensity) / 2,
          precipIntensityMax: (weatherHistoryData[i].precipIntensityMax + weatherHistoryData[i + 1].precipIntensityMax) / 2,
          precipProbability: (weatherHistoryData[i].precipProbability + weatherHistoryData[i + 1].precipProbability) / 2,
          pressure: (weatherHistoryData[i].pressure + weatherHistoryData[i + 1].pressure) / 2,
          temperatureHigh: (weatherHistoryData[i].temperatureHigh + weatherHistoryData[i + 1].temperatureHigh) / 2,
          temperatureLow: (weatherHistoryData[i].temperatureLow + weatherHistoryData[i + 1].temperatureLow) / 2,
          temperatureMax: (weatherHistoryData[i].temperatureMax + weatherHistoryData[i + 1].temperatureMax) / 2,
          temperatureMin: (weatherHistoryData[i].temperatureMin + weatherHistoryData[i + 1].temperatureMin) / 2,
          uvIndex: (weatherHistoryData[i].uvIndex + weatherHistoryData[i + 1].uvIndex) / 2,
          visibility: (weatherHistoryData[i].visibility + weatherHistoryData[i + 1].visibility) / 2,
          windGust: (weatherHistoryData[i].windGust + weatherHistoryData[i + 1].windGust) / 2,
          windSpeed: (weatherHistoryData[i].windSpeed + weatherHistoryData[i + 1].windSpeed) / 2
        }
        console.log("New Object: ", newObj);
        convertedWeatherData.push(newObj);
      }

    }
    console.log("Data averages: ", convertedWeatherData);
    this.setState({ weatherAverages: convertedWeatherData });
  }

  searchThis = event => {
    event.preventDefault();
    console.log(`Search for: ${this.state.search}`);
    let weatherHistoryData = [];
    // Axios.get(`https://api.opencagedata.com/geocode/v1/json?q=${this.state.search}&key=${process.env.CageAPIKey || APIKEY.cageAPIKey}`)
    Axios.get(`https://api.opencagedata.com/geocode/v1/json?q=${this.state.search}&key=${process.env.CageAPIKey}`)  
    .then(data => {
        let { lat, lng } = data.data.results[0].geometry;
        this.setState({ lat: lat, lng: lng});
        for (let i = 0; i < 30; i++) {
          // Axios.get(`https://cors-anywhere.herokuapp.com/https://api.darksky.net/forecast/${process.env.darkSkyAPIKey || APIKEY.darkSkyAPIKey}/${lat},${lng},${Times.times[i]}?exclude=hourly,currently,flags`).then(data => {
            Axios.get(`https://cors-anywhere.herokuapp.com/https://api.darksky.net/forecast/${process.env.darkSkyAPIKey}/${lat},${lng},${Times.times[i]}?exclude=hourly,currently,flags`).then(data => {  
          console.log("Individual Data: ", data.data.daily.data[0]);
            weatherHistoryData.push(data.data.daily.data[0]);
            if (i === 29) {
              this.getAverageWeather(weatherHistoryData);
            }
          })
        }
      })
      .catch(err => console.log(err));

  }

  render() {
    return (
      <>
        <SearchField value={this.state.search} handleInputChange={this.handleInputChange} onSubmit={this.searchThis} />
        <BottomRow latlng={{ lat: this.state.lat, lng: this.state.lng }} weatherAverages={this.state.weatherAverages}/>
      </>
    );
  }
}

export default Home;