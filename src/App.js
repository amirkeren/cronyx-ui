import React, { Component } from 'react';
import './App.css';
import './bootstrap-grid.css';
import './bootstrap-reboot.css';
import './bootstrap.css';

import Header from "./Header/Header";
import Screen from './screen/index.js';

import Sidebar from "./Sidebar/Sidebar";

class App extends Component {
  render() {
    return (
        <div className="App">
            <Header/>
            <div className="row">
                <Sidebar className="col-3"/>
                <Screen/>
            </div>
        </div>
    );
  }
}

export default App;
