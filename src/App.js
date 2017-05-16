import React, { Component } from 'react';
import './App.css';
import './bootstrap-grid.css';
import './bootstrap-reboot.css';
import './bootstrap.css';

import Header from "./Header/Header";
import Screen from './screen/index.js';


class App extends Component {
  render() {
    return (
      <div className="App">
        <Header/>
        <Screen/>
        

      </div>
    );
  }
}

export default App;
