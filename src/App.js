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
import {createImmediateTriger} from './ajaxutils';
import {createCronTriger} from './ajaxutils';

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
                          subtitle={"Enter new trigger details"}
                          active={!!this.state.isCreateTrigger}
                          buttons={[
                          {
                              text: "Cancel",
                              onClick: () => this.setState({ isCreateTrigger: false })
                          },
                          {
                              text: "Create",
                              primary: true,
                              onClick: () => this.createTrigger()
                          }
                          ]}>
                          <CreateForm/>
                      </Modal>
                </div>
            </div>
        );
    }

    createTrigger(triggerType, triggerName, triggerGroup, jobName, jobGroup, jobData, cronExpression) {
      let jobDataArray = jobData.split('\n');
      let jobDataJson = '{';
      for (var i = 0; i < jobDataArray.length; i++) {
          let key = jobDataArray[i].split("=")[0];
          let value = jobDataArray[i].split("=")[1];
          jobDataJson += "'" + key + "': " + "'" + value + "',";
      }
      jobDataJson = jobDataJson.substring(0, jobDataJson.length - 1) + '}';
      if (triggerType === 'Immediate') {
        createImmediateTriger(triggerName, triggerGroup, jobName, jobGroup, jobDataJson).then(res => {
            alert('Trigger Created');
        }).catch(err => {
            alert(err);
        });
      } else {
        createCronTriger(triggerName, triggerGroup, jobName, jobGroup, jobDataJson, cronExpression).then(res => {
            alert('Trigger Created');
        }).catch(err => {
            alert(err);
        });
      }
      this.setState({ isCreateTrigger: false });
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
