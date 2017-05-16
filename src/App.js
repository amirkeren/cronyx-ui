import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';
import './bootstrap-grid.css';
import './bootstrap-reboot.css';
import './bootstrap.css';

import Screen from './screen/index.js';


class App extends Component {
  render() {
    return (
      <div className="App">
            <Screen/>

      </div>
    );
  }
}

export default App;
