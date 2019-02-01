import React from "react";
import "./style.css";

function SearchField(props) {
    return (
        <div id="area">
            <form>
                <label htmlFor="search-field">Search an area of the world: </label>
                <input className="form-control mr-sm-6" id="search-field" name="search" value={props.value} onChange={props.handleInputChange} />
                <button onClick={props.onSubmit}>Search</button>
            </form>
        </div>
    );
}

export default SearchField;