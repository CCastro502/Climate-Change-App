import React from "react";
import "./style.css";

function VariableButtons() {
    return (
        <div id="buttons">
            <div className="btn-group">
                <button type="button" className="btn btn-primary dropdown-toggle" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
                    X-Axis
                </button>
                <div className="dropdown-menu">
                    <a className="dropdown-item" href="#">Sort this way</a>
                    <a className="dropdown-item" href="#">Sort that way</a>
                    <a className="dropdown-item" href="#">Don't sort this way</a>
                </div>
            </div>
            <div className="btn-group">
                <button type="button" className="btn btn-secondary dropdown-toggle" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
                    Y-Axis
                </button>
                <div className="dropdown-menu">
                    <a className="dropdown-item" href="#">Sort this way</a>
                    <a className="dropdown-item" href="#">Sort that way</a>
                    <a className="dropdown-item" href="#">Don't sort this way</a>
                </div>
            </div>
        </div>
    );
}

export default VariableButtons;