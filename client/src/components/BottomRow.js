import React from "react";
import './BottomRow.css';
import Chart from './Chart';
import VariableButtons from './VariableButtons';
import { Map, TileLayer, Marker, Popup } from 'react-leaflet';
import 'leaflet';

function BottomRow(props) {
    const latlng = {
        lat:  props.lat || 51.505,
        lng: props.lng || -0.09
    };

    // try {
    //     if (props.lat.length > 1) {
    //         latlng.lat = props.lat;
    //         latlng.lng = props.lng;
    //     }
    // } catch {
    //     console.log("No location data given");
    // }

    return (
        <div className="container">
            <div className="row">
                <div className="col-md-5">
                    <Chart />
                </div>
                <div className="col-md-1">
                    <VariableButtons />
                </div>
                <div className="col-md-6">
                    <div className="mapid">
                        <div className="leaflet-container">
                            <Map center={latlng} zoom={13}>
                                <TileLayer 
                                    attribution='&copy; <a href="http://osm.org/copyright">OpenStreetMap</a> contributors'
                                    url='http://{s}.tile.osm.org/{z}/{x}/{y}.png'
                                />
                                <Marker position={latlng} >
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

export default BottomRow;