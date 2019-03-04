import React, { Component } from "react";
import SavedCard from "../components/SavedCard";
import Axios from "axios";
import "./ProfileStyle.css";
import { isString } from "util";

class Profile extends Component {
  state = {
    cardData: "",
    newTitle: "",
    newComments: "",
    clickedChart: 0,
    data: []
  }

  handleInputChange = event => {
    const { name, value } = event.target;
    this.setState({ [name]: value });
  }

  returnCards = () => {
    Axios.get(`/api/users/${sessionStorage.getItem('email')}`)
      .then(res => this.setState({ cardData: res.data }))
      .catch(err => console.log(err))
  }

  componentDidMount() {
    this.returnCards();
    this.pullChartInfo();
  }

  clickChart = event => {
    this.setState({ clickedChart: (event.target.id).split("-")[1] });
    this.pullChartInfo();
  }

  defineAxis = () => {
    console.log("state", this.state.data[1]);
    let definition = (this.state.data[1]).split(/(?=[A-Z])/).join(" ");
    console.log(definition);
    return definition.charAt(0).toUpperCase() + definition.slice(1);
  }

  changeChartInfo = event => {
    event.preventDefault();
    if (this.state.newTitle && this.state.newComments) {
      let updatedInfo = this.state.data;
      updatedInfo[2] = this.state.newTitle;
      updatedInfo[3] = this.state.newComments;
      let newCardData = this.state.cardData;
      newCardData[parseInt(this.state.clickedChart)] = updatedInfo;
      Axios.post(`/api/users/update/${sessionStorage.getItem('email')}`, newCardData)
        .then(res => window.location.reload())
        .catch(err => console.log(err));
    } else if (this.state.newTitle) {

    } else if (this.state.newComments) {

    } else {
      return;
    }
  }

  displayChartInfo = () => {
    console.log(this.state.data);
    if ((this.state.data).length >= 2) {
      return (
        <>
          <h1>{this.state.data[2]}</h1>
          <hr />
          <h3>Location: </h3>
          <p>Latitude: {this.state.data[0].lat}</p>
          <p>Longitude: {this.state.data[0].lng}</p>
          <p>Axis Definition: {this.defineAxis()}</p>
          <hr />
          <h3>Comments: </h3>
          <p>{this.state.data[3]}</p>
          <hr />
          <h3>Edit Chart Info: </h3>
          <form>
            Edit Title: <br />
            <input class="edit-chart" type="text" name="newTitle" onChange={this.handleInputChange} value={this.state.newTitle} placeholder="Title here..." />
            Edit Comments: <br />
            <input class="edit-chart" type="text" name="newComments" onChange={this.handleInputChange} value={this.state.newComments} placeholder="Edit your comments of the chart here" />
            <input type="submit" onClick={this.changeChartInfo} />
          </form>
        </>
      )
    } else {
      return (
        <h1>Hi muffin!</h1>
      )
    }

  }

  pullChartInfo = () => {
    Axios.get(`/api/users/${sessionStorage.getItem('email')}`)
      .then(data => {
        const indData = data.data[parseInt(this.state.clickedChart)];
        this.setState({ data: indData });
      })
      .catch(err => {
        console.log(err);
      });
  }



  render() {
    return (
      <div className="container" id="profile-container">
        <div id="cards-container">
          <SavedCard cardData={this.state.cardData} onClick={this.clickChart} />
        </div>
        <div id="chart-info-container">
          {this.displayChartInfo()}
        </div>
      </div>
    );
  }
}

export default Profile;