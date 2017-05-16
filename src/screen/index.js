import React, { Component } from 'react';
import './style.css';

class Screen extends Component{
    render() {
        return(
            <div className="main-screen-wrapper">
                <div className="row triggers-header align-items-center">
                    <h1 className="col-sm-3 triggers-list-header">Triggers List</h1>
                    <div className="offset-sm-4 col-sm-4">
                        <input className="search-box" placeholder="type trigger name" />
                    </div>
                </div>
                <div className="row table-wrapper"></div>
            </div>
        );
    }
}

export default Screen;
