import React,{Component} from "react";
import "./style.css";
import { Bar } from "react-chartjs-2";


class Chart extends Component {
    state = {
        chartData: {
            Labels: ["Boston", 'Worester', 'Springfield', 'D.C'],
            datasets: [{
                Labels: 'Population',
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
           
            <Bar
                data = {this.state.chartData}
                width={10}
                height={50}
                options={{
                    maintainAspectRatio: false
                }}
            ></Bar>
            
        )
    }
}

export default Chart;