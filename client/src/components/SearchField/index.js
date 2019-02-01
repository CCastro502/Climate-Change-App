import React from "react";
import "./style.css";

function SearchField(props) {
    return (
        <div id="area">
            <form onSubmitCapture={props.onSubmit}>
                <label htmlFor="search-field">Search an area of the world: </label>
                <input className="form-control mr-sm-6" id="search-field" name="search" value={props.value} onChange={props.handleInputChange} />
            </form>
        </div>
    );
}

export default SearchField;