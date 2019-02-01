import React from "react";
import './BottomRow.css';
import Chart from'./Chart';
import Map from'./Map';
import VariableButtons from './VariableButtons';

function SearchField() {
    return (
        <div id="bottom-row">
            <Chart />
            <VariableButtons />
            <Map />
        </div>
    );
}

export default SearchField;