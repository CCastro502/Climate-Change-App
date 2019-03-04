import React, { Component } from "react";
import "./style.css";
import { Card, CardTitle } from 'react-materialize';
import chartImg from "./chart.png";


class SavedCard extends Component {
    state = {
    }

    componentDidMount() {
        this.renderCards();
    }
    renderCards = () => {
        if (!this.props.cardData) {
            return (
                <h1>Nothing Yet</h1>
            )
        }
        return (
            this.props.cardData.map((data, uid) => {
                return (
                    <li key={uid} id={`chart-${uid}`} onClickCapture={this.props.onClick} >
                        <img src="https://images.vexels.com/media/users/3/131136/isolated/lists/4c711c7ec7a01da4a8adf53684a13209-increasing-multicolor-line-chart.png" id={`img-${uid}`} />
                        <h3 className="chart-title" id={`header-${uid}`} >{data[2]}</h3>
                        <p id={`latlng-${uid}`}>
                            Lat: {data[0].lat} | Lng: {data[0].lng}
                        </p>
                        <p id={`comment-${uid}`}>
                            {data[3]}
                        </p>
                    </li>
                )
            }
            )
        );

    }



    render() {
        return (
            <div className="card-holder">
                <ul>
                    {this.renderCards()}
                </ul>
            </div>
        );
    }


}

export default SavedCard;