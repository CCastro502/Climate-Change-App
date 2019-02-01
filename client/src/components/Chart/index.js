import React, { Component } from "react";
import "./style.css";
import { Bar } from "react-chartjs-2";


class Chart extends Component {
    state = {
        chartData: {
            labels: ["Boston", 'Worester', 'Springfield', 'D.C'],
            datasets: [{
                labels: 'Population',
                data: [
                    200,
                    300,
                    400,
                    50000,
                ]
            }]
        }
    }


    render() {
        return (
            <div className="container">
                <Bar
                    data={this.state.chartData}
                    width={1}
                    height={1}
                    options={{
                        maintainAspectRatio: true
                    }}
                >
                </Bar>
            </div>


        )
    }
}

export default Chart;