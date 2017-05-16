import React, { Component } from 'react';
import './App.css';
import './bootstrap-grid.css';
import './bootstrap-reboot.css';
import './bootstrap.css';

import Header from "./header/Header";
import Screen from './screen/index.js';

import Sidebar from "./sidebar/Sidebar";
import './ajaxutils.js';

class App extends Component {
  render() {
    return (
        <div className="App">
            <Header/>
            <div className="MainContainer row no-gutters">
                <div className="col-2"><Sidebar/></div>
                <div className="col-10"><Screen/></div>
            </div>
        </div>
    );
  }
}

export default App;
