import React, { Component } from 'react';
import './App.css';
import './bootstrap-grid.css';
import './bootstrap-reboot.css';
import './bootstrap.css';

import Header from "./header/Header";
import Screen from './screen/index.js';
import HistoryScreen from './historyScreen/HistoryScreen';
import Sidebar from "./sidebar/Sidebar";
import './ajaxutils.js';

class App extends Component {

    constructor() {
        super();
        this.state = {
            activeButtonId: 0
        }

        this.handleClick = this.handleClick.bind(this);
    }

    screens = [<Screen/>, <HistoryScreen/>];

    render() {
        return (
            <div className="App">
                <Header/>
                <div className="MainContainer row no-gutters">
                    <div className="col-2"><Sidebar activeButtonId={this.state.activeButtonId} handleClick={this.handleClick}/></div>
                    <div className="col-10">{this.getActiveScreen()}</div>
                </div>
            </div>
        );
    }

    getActiveScreen() {
        return (
            this.screens[this.state.activeButtonId]
        );
    }

    handleClick(buttonId) {
        this.setState({activeButtonId: buttonId});
    }
}

export default App;
