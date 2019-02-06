import React, { Component } from "react";
import "./style.css";
import { Line } from "react-chartjs-2";
import { SSL_OP_TLS_ROLLBACK_BUG } from "constants";
import { Input } from 'react-materialize';



class Chart extends Component {
    state = {
        chartData: {
            labels: ["January", 'February', 'March', 'April', 'June', 'July', 'August', 'September', 'October', 'November', 'December'],
            datasets: [{
                labels: 'Population',
                data: [
                    200,
                    300,
                    400,
                    50000,
                ]
            }]
        },
        axisValue: 1,
        axisDefinition: "temperatureHigh"
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
            } else if (12 <= i < 24) {
                year2.push(weather[i][axis]);
            } else if (24 <= i < 36) {
                year3.push(weather[i][axis]);
            } else if (36 <= i < 48) {
                year4.push(weather[i][axis]);
            } else if (48 <= i < 60) {
                year5.push(weather[i][axis]);
            } else if (60 <= i < 72) {
                year6.push(weather[i][axis]);
            } else if (72 <= i < 84) {
                year7.push(weather[i][axis]);
            } else if (84 <= i < 96) {
                year8.push(weather[i][axis]);
            } else if (96 <= i < 108) {
                year9.push(weather[i][axis]);
            } else if (108 <= i < 120) {
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
                        strokeColor: "rgba(151, 187, 205, 1)"
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

    render() {
        return (
            <div className="container">
                <Line
                    data={this.state.chartData}
                    width={1}
                    height={1}
                    options={{
                        maintainAspectRatio: true
                    }}
                >
                </ Line>
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
            </div>


        )
    }
}

export default Chart;