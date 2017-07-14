import React, {Component} from 'react';
import './App.css';
import './bootstrap-grid.css';
import './bootstrap-reboot.css';
import './bootstrap.css';

import _ from 'lodash';
import Header from "./header/Header";
import Screen from './screen/index.js';
import HistoryScreen from './historyScreen/HistoryScreen';
import Sidebar from "./sidebar/Sidebar";
import Modal from './Modal/index';
import {createImmediateTriger, getAllJobs} from './ajaxutils';
import {createCronTriger} from './ajaxutils';
import Dropdown from 'react-dropdown';

class App extends Component {

    constructor() {
        super();

        this.state = {
            activeButtonId: 0,
            isCreateTrigger: false,
            jobs: [],
            selectedJob: "",
            type: "Immediate",
            triggerName: "",
            parametersMap: "",
            cronExpression: ""
        };

        this.handleTabClick = this.handleTabClick.bind(this);
        this.createTrigger = this.createTrigger.bind(this);
        this.handleCreateTriggerClick = this.handleCreateTriggerClick.bind(this);

        this.onTypeChange = this.onTypeChange.bind(this);
        this.onPramatersChange = this.onPramatersChange.bind(this);
        this.onTriggerNameChange = this.onTriggerNameChange.bind(this);
        this.onCronExpressionChange = this.onCronExpressionChange.bind(this);
        this.onSelection = this.onSelection.bind(this);

        this.screens = [< Screen />, < HistoryScreen />];

        getAllJobs().then(res => {
          const jobsResult = res.data.map(j => j.key.group + "." + j.key.name);
          const sortedJobs = _.sortBy(jobsResult, [function(o) { return o; }]);
          this.setState({ jobs: sortedJobs})
        }).catch(err => {
          alert(err);
        });
    }

    onCronExpressionChange(e) {
        this.setState({cronExpression: e.target.value});
    }

    onSelection(selected) {
        this.setState({selectedJob: selected})
    }

    onTypeChange(e) {
        this.setState({type: e.target.value});
    }

    onPramatersChange(e) {
        this.setState({parametersMap: e.target.value})
    }

    onTriggerNameChange(e) {
        this.setState({triggerName: e.target.value});
    }

    render() {
        return (
            <div className="App">
                <Header/>
                <div className="MainContainer row no-gutters">
                    <div className="col-2">
                        <Sidebar activeButtonId={this.state.activeButtonId} handleTabClick={this.handleTabClick}
                                 handleCreateTriggerClick={this.handleCreateTriggerClick}/>
                    </div>
                    <div className="col-10">{this.getActiveScreen()}</div>
                    <Modal title="Create Trigger" subtitle={"Enter new trigger details"}
                           active={!!this.state.isCreateTrigger} buttons={[
                        {
                            text: "Cancel",
                            onClick: () => this.setState({isCreateTrigger: false})
                        }, {
                            text: "Create",
                            primary: true,
                            onClick: () => this.createTrigger()
                        }
                    ]}>
                        <div className="form-group">
                            <div className="form-group">
                                <label htmlFor="jobname" className="Job-name">Job name:</label>
                                <Dropdown options={this.state.jobs} id="jobname" onChange={this.onSelection}
                                          value={this.state.selectedJob} placeholder="Select job name"/>
                            </div>
                            <div className="form-group">
                                <label className="form-check Trigger-Type">Trigger type:</label>
                                <label className="form-check-label" htmlFor="immediate">
                                    <input type="radio" defaultChecked={true} onChange={this.onTypeChange}
                                           className="form-check-input p-10" name="trigger-type" id="immediate"
                                           value="Immediate"/>
                                    <span>Immediate</span>
                                </label>
                                <label className="ml-10 form-check-label" htmlFor="cron">
                                    <input type="radio" onChange={this.onTypeChange} className="form-check-input p-10"
                                           name="trigger-type" id="cron" value="Cron"/>
                                    <span>Cron</span>
                                </label>
                            </div>
                            {this.state.type === "Cron" ?
                                <div className="form-group">
                                    <label htmlFor="cronExpression" className="Trigger-name">Cron expression:</label>
                                    <input type="text" onChange={this.onCronExpressionChange}
                                           className="Rectangle-2 form-control" id="cronExpression"/>
                                </div>
                                : null
                            }
                            <div className="form-group">
                                <label htmlFor="triggername" className="Trigger-name">Trigger name:</label>
                                <input type="text" onChange={this.onTriggerNameChange}
                                       className="Rectangle-2 form-control" id="triggername"/>
                            </div>
                            <div className="form-group">
                                <label htmlFor="parametermap" className="Parameter-map">Parameter map:</label>
                                <textarea onChange={this.onPramatersChange} className="form-control Rectangle-3"
                                          id="parametermap" rows="5"/>
                            </div>
                        </div>
                    </Modal>
                </div>
            </div>
        );
    }

    createTrigger() {
        if(!this.validateCreateTriggerInput()) {
            return;
        }

        let inputCronExpression = this.state.cronExpression;
        let triggerGroup = this.getGroup(this.state.triggerName);
        let triggerName = this.getName(this.state.triggerName);
        let jobGroup = this.getGroup(this.state.selectedJob.value);
        let jobName = this.getName(this.state.selectedJob.value);
        let paramJson = this.getParamJson();
        if(!paramJson) {
            return;
        }

        if (this.state.type === 'Immediate') {
            createImmediateTriger(triggerName, triggerGroup, jobName, jobGroup, paramJson)
                .then(res => {
                    alert('Trigger created and started running');
                    location.reload();
                }).catch(err => {
                    alert(err);
                });
        } else {
            createCronTriger(triggerName, triggerGroup, jobName, jobGroup, paramJson, inputCronExpression)
                .then(res => {
                    alert('Trigger created');
                    location.reload();
                }).catch(err => {
                    alert(err);
                });
        }

        this.resetState();
    }

    validateCreateTriggerInput() {
        if (!this.state.triggerName || this.state.triggerName.split(".").length < 2) {
            alert('Enter trigger name in the format <groupname>.<triggername>');
            return false;
        }
        if (!this.state.selectedJob || !this.state.selectedJob.value) {
            alert('Select a job');
            return false;
        }
        if(this.state.type === 'Cron' && !this.state.cronExpression) {
            alert('Enter Cron expression');
            return false;
        }
        return true;
    }

    getGroup(input) {
        return input.split(".")[0];
    }

    getName(input) {
        return input.substr(input.split(".")[0].length + 1);
    }

    getParamJson() {
        if (!this.state.parametersMap) {
            return "{}";
        }

        let jobDataArray = this.state.parametersMap.split('\n');
        let jobDataJson = '{';
        for (let i = 0; i < jobDataArray.length; i++) {
            if (jobDataArray[i].split("=").length !== 2) {
                alert('Invalid data map: ' + jobDataArray[i]);
                return null;
            }
            let key = jobDataArray[i].split("=")[0];
            let value = jobDataArray[i].split("=")[1];
            jobDataJson += "\"" + key + "\": \"" + value + "\",";
        }

        jobDataJson = jobDataJson.slice(0, -1);
        return jobDataJson + '}';
    }

    resetState() {
        this.setState({selectedJob: "", type: "Immediate", triggerName: "", parametersMap: "", cronExpression: "", isCreateTrigger: false});
    }

    getActiveScreen() {
        return (this.screens[this.state.activeButtonId]);
    }

    handleTabClick(buttonId) {
        this.setState({activeButtonId: buttonId});
    }

    handleCreateTriggerClick() {
        this.setState({isCreateTrigger: true});
    }
}

export default App;