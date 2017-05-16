import React, { Component } from 'react';
import './App.css';
import './bootstrap-grid.css';
import './bootstrap-reboot.css';
import './bootstrap.css';

import Header from "./header/Header";
import Screen from './screen/index.js';
import HistoryScreen from './historyScreen/HistoryScreen';
import Sidebar from "./sidebar/Sidebar";
import Modal from './Modal/index';
import CreateForm from './createform/index';
import './ajaxutils.js';

class App extends Component {

    constructor() {
        super();

        this.state = {
            activeButtonId: 0,
            isCreateTrigger: false
        };

        this.handleTabClick = this.handleTabClick.bind(this);
        this.handleCreateTriggerClick = this.handleCreateTriggerClick.bind(this);

        this.screens = [<Screen/>, <HistoryScreen/>];
    }

    render() {
        return (
            <div className="App">
                <Header/>
                <div className="MainContainer row no-gutters">
                    <div className="col-2"><Sidebar activeButtonId={this.state.activeButtonId} handleTabClick={this.handleTabClick} handleCreateTriggerClick={this.handleCreateTriggerClick}/></div>
                    <div className="col-10">{this.getActiveScreen()}</div>
                      <Modal title="Create Trigger"
                          active={!!this.state.isCreateTrigger}
                          subtitle={'blabla'}
                          buttons={[
                          {
                              text: "Create",
                              primary: true,
                              onClick: () => this.deleteTrigger()
                          },
                          {
                              text: "Cancel",
                              onClick: () => this.setState({ isCreateTrigger: false })
                          }
                          ]}>
                          <CreateForm/>
                      </Modal>
                </div>
            </div>
        );
    }

    getActiveScreen() {
        return (
            this.screens[this.state.activeButtonId]
        );
    }

    handleTabClick(buttonId) {
        this.setState({activeButtonId: buttonId});
    }

    handleCreateTriggerClick() {
        this.setState({isCreateTrigger: true});
    }

}

export default App;
