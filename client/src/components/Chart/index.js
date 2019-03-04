import React, { Component } from "react";
import "./style.css";
import { Line } from "react-chartjs-2";
import { SSL_OP_TLS_ROLLBACK_BUG } from "constants";
import { Input } from 'react-materialize';
import Axios from "axios";



class Chart extends Component {
    state = {
        chartData: {
            labels: ["January", 'February', 'March', 'April', 'June', 'July', 'August', 'September', 'October', 'November', 'December'],
            datasets:
                [
                    {
                        label: 'Population',
                        data: [
                            100,
                            200,
                            300,
                            400,
                            500,
                            600,
                            700,
                            800,
                            900,
                            1000,
                            1100,
                            1200
                        ]
                    }
                ]
        },
        axisValue: 1,
        axisDefinition: "temperatureHigh",
        title: ""
    }

    componentDidMount() {
        this.canDefineAxis();
    }

    handleInputChange = event => {
        const { name, value } = event.target;
        this.setState({ [name]: value });
    }

    weatherInfo = () => {
        const weather = this.props.weatherAverages;
        const axis = this.state.axisDefinition;
        let year1 = [];
        let year2 = [];
        let year3 = [];
        let year4 = [];
        let year5 = [];
        let year6 = [];
        let year7 = [];
        let year8 = [];
        let year9 = [];
        let year10 = [];
        for (let i = 0; i < weather.length; i++) {
            if (i < 12) {
                year1.push(weather[i][axis]);
            } else if (i < 24) {
                year2.push(weather[i][axis]);
            } else if (i < 36) {
                year3.push(weather[i][axis]);
            } else if (i < 48) {
                year4.push(weather[i][axis]);
            } else if (i < 60) {
                year5.push(weather[i][axis]);
            } else if (i < 72) {
                year6.push(weather[i][axis]);
            } else if (i < 84) {
                year7.push(weather[i][axis]);
            } else if (i < 96) {
                year8.push(weather[i][axis]);
            } else if (i < 108) {
                year9.push(weather[i][axis]);
            } else if (i < 120) {
                year10.push(weather[i][axis]);
            }
        }
        this.setState({
            chartData: {
                labels: ["January", 'February', 'March', 'April', 'June', 'July', 'August', 'September', 'October', 'November', 'December'],
                datasets: [
                    {
                        label: "Year 1 Line",
                        data: year1,
                        strokeColor: "rgba(220,220,220,1)"
                    }, {
                        label: "Year 2 Line",
                        data: year2,
                        strokeColor: "rgba(121, 157, 105, 1)"

                    }, {
                        label: "Year 3 Line",
                        data: year3,
                        strokeColor: "rgba(161, 157, 105, 1)"

                    }, {
                        label: "Year 4 Line",
                        data: year4,
                        strokeColor: "rgba(111, 157, 105, 1)"

                    }, {
                        label: "Year 5 Line",
                        data: year5,
                        strokeColor: "rgba(121, 117, 105, 1)"

                    }, {
                        label: "Year 6 Line",
                        data: year6,
                        strokeColor: "rgba(101, 157, 105, 1)"

                    }, {
                        label: "Year 7 Line",
                        data: year7,
                        strokeColor: "rgba(121, 157, 165, 1)"

                    }, {
                        label: "Year 8 Line",
                        data: year8,
                        strokeColor: "rgba(181, 107, 105, 1)"

                    }, {
                        label: "Year 9 Line",
                        data: year9,
                        strokeColor: "rgba(143, 157, 105, 1)"

                    }, {
                        label: "Year 10 Line",
                        data: year10,
                        strokeColor: "rgba(121, 159, 105, 1)"

                    }]
            }
        })
    }

    handleChange = event => {
        switch (event.currentTarget.options.selectedIndex) {
            case 0:
                console.log("High temperature");
                this.setState({ axisDefinition: "temperatureHigh" });
                break;
            case 1:
                console.log("Low temperature");
                this.setState({ axisDefinition: "temperatureLow" });
                break;
            case 2:
                console.log("Humidity");
                this.setState({ axisDefinition: "humidity" });
                break;
            case 3:
                console.log("Precipitation Intensity");
                this.setState({ axisDefinition: "precipIntensityMax" });
                break;
            case 4:
                console.log("Dew Point");
                this.setState({ axisDefinition: "dewPoint" });
                break;
            case 5:
                console.log("Visibility");
                this.setState({ axisDefinition: "visibility" });
                break;
            case 6:
                console.log("Wind Speed");
                this.setState({ axisDefinition: "windSpeed" });
                break;
            case 7:
                console.log("UV Index");
                this.setState({ axisDefinition: "uvIndex" });
                break;
            case 8:
                console.log("Cloud Cover");
                this.setState({ axisDefinition: "cloudCover" });
                break;
            case 9:
                console.log("Pressure");
                this.setState({ axisDefinition: "pressure" });
                break;
        }
    }

    grabTitle = () => {
        if (this.state.title) {
            return this.state.title;
        } else {
            return "No given title";
        }
    }

    saveChart = () => {
        const deets = [this.props.latlng, this.state.axisDefinition, this.grabTitle(), "No comment has been given to this chart"];
        console.log("deets", deets);
        console.log(`/api/users/save/${sessionStorage.getItem('email')}`);
        Axios.post(`/api/users/save/${sessionStorage.getItem('email')}`, deets)
            .then(res => {
                console.log("Successful: ", res);
                alert("You have saved");
                return res;
            })
            .catch(err => console.log(err));
    }

    canSave = () => {
        if (!isNaN(this.props.latlng.lat) && sessionStorage.getItem("loggedIntoCCA") === "true") {
            return (
                <div id="title">
                    Title: <input type="text" value={this.state.title} name="title" onChange={this.handleInputChange} />
                    <button id='save' onClick={this.saveChart}>Save Me</button>
                </div>
            );
        } else {
            return (
                <div id="title">
                    <input type="text" value={this.state.title} name="title" onChange={this.handleInputChange} id="title-text" placeholder="Give your chart a title" />
                    <button id='save' disabled>Save Me</button>
                </div>
            );
        }
    }

    canDefineAxis = () => {
        if (this.props.weatherAverages) {
            return (<>
                <Input type='select' label="Y-Axis" defaultValue={this.state.axisValue} onChange={this.handleChange}>
                    <option value='1'>High Temp</option>
                    <option value='2'>Low Temp</option>
                    <option value='3'>Humidity</option>
                    <option value='4'>Precipitation Intensity</option>
                    <option value='5'>Dew Point</option>
                    <option value='6'>Visibility</option>
                    <option value='7'>Wind Speed</option>
                    <option value='8'>UV Index</option>
                    <option value='9'>Cloud Cover</option>
                    <option value='10'>Pressure</option>
                </Input>
                <button onClick={this.weatherInfo}>Weather here!</button>
            </>);
        } else {
            return (<>
                <a href="https://darksky.net/poweredby/"><img src="https://darksky.net/dev/img/attribution/poweredby.png" id="dark-sky" /></a>
            </>);
        }
    }

    render() {
        return (
            <div className="container">
                {this.canSave()}
                <Line
                    data={this.state.chartData}
                    id="chart"
                    width={1}
                    height={1}
                    options={{
                        maintainAspectRatio: true
                    }}
                >
                </ Line>
                {this.canDefineAxis()}

            </div>


        )
    }
}

export default Chart;