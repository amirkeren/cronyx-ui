import React, { Component } from 'react';
import './App.css';
import Header from "./Header/Header";
import Sidebar from "./Sidebar/Sidebar";

class App extends Component {
  render() {
    return (
        <div className="App">
            <Header/>
            <div className="row">
                <Sidebar className="col-3"/>
                <div className="col-9">
                    <p className="App-intro">
                        To get started, edit <code>src/App.js</code> and save to reload.
                    </p>
                </div>
            </div>
        </div>
    );
  }
}

export default App;
