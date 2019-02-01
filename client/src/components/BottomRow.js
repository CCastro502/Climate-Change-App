import React from "react";
import './BottomRow.css';
import Chart from './Chart';
import VariableButtons from './VariableButtons';
import { Map, TileLayer } from 'react-leaflet';
import 'leaflet';

function BottomRow(props) {
    const latlng = {
        lat: 51.505,
        lng: -0.09,
    };

    try {
        if (props.lat.length > 1) {
            latlng.lat = props.lat;
            latlng.lng = props.lng;
        }
    } catch {
        console.log("No location data given");
    }

    return (
        <div className="container">
            <div className="row">
                <div className="col-md-5">
                    <Chart />
                </div>
                <div className="col-md-2">
                    <VariableButtons />
                </div>
                <div className="col-md-5">
                    <div className="leaflet-container">
                        <Map
                            center={latlng}
                            length={4}
                            zoom={15}>
                            <TileLayer
                                attribution='&amp;copy <a href="http://osm.org/copyright">OpenStreetMap</a> contributors'
                                url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png?access_token=pk.eyJ1IjoiY2Nhc3RybzUwMiIsImEiOiJjanA0YzB4bzYwa2I5M3FwaDNlc2l1anlyIn0.0lLlB4oA381Yw5XR6z6tgA"
                            />
                        </Map>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default BottomRow;