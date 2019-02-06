import React, { Component } from "react";
import './BottomRow.css';
import Chart from './Chart';
import { Map, TileLayer, Marker, Popup } from 'react-leaflet';
import 'leaflet';
class BottomRow extends Component {
    latlng = {
        lat: this.props.lat || 51.505,
        lng: this.props.lng || -0.09
    };

    render() {
        return (
            <div className="container">
                <div className="row">
                    <div className="col-md-6">
                        <Chart weatherAverages={this.props.weatherAverages} />
                    </div>
                    <div className="col-md-6">
                        <div id="mapid">
                            <div className="leaflet-container">
                                <Map center={this.props.latlng.lat ? this.props.latlng: { lat: 51.505, lng: -0.09 }} zoom={13}>
                                    <TileLayer
                                        attribution='&copy; <a href="http://osm.org/copyright">OpenStreetMap</a> contributors'
                                        url='http://{s}.tile.osm.org/{z}/{x}/{y}.png'
                                    />
                                    <Marker position={this.latlng} >
                                        <Popup>
                                            <span>A pretty CSS3 popup. <br /> Easily customizable</span>
                                        </Popup>
                                    </Marker>
                                </Map>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        );
    }


}

export default BottomRow;