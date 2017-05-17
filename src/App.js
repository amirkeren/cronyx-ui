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
            type: "",
            triggerName: null,
            parametersMap: null,
            cronExpression: null
        };

        this.handleTabClick = this.handleTabClick.bind(this);
        this.createTrigger = this.createTrigger.bind(this);
        this.setFormData = this.setFormData.bind(this);

        this.onTypeChange = this.onTypeChange.bind(this);
        this.onPramatersChange = this.onPramatersChange.bind(this);
        this.onTriggerNameChange = this.onTriggerNameChange.bind(this);
        this.onCronExpressionChange = this.onCronExpressionChange.bind(this);

        this.handleCreateTriggerClick = this.handleCreateTriggerClick.bind(this);

        this.screens = [ < Screen />, < HistoryScreen />
        ];
        getAllJobs().then(res => {
          const jobsResult = res.data.map(j => j.key.group + "." + j.key.name);
          const sortedJobs = _.sortBy(jobsResult, [function(o) { return o; }]);
          this.setState({ jobs: sortedJobs})
        });

        this.onSelection = this.onSelection.bind(this);
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
                    <div className="col-2"><Sidebar activeButtonId={this.state.activeButtonId} handleTabClick={this.handleTabClick} handleCreateTriggerClick={this.handleCreateTriggerClick}/></div>
                    <div className="col-10">{this.getActiveScreen()}</div>
                    <Modal title="Create Trigger" subtitle={"Enter new trigger details"} active={!!this.state.isCreateTrigger} buttons={[
                        {
                            text: "Cancel",
                            onClick: () => this.setState({isCreateTrigger: false})
                        }, {
                            text: "Create",
                            primary: true,
                            onClick: () => this.createTrigger(this.state.triggerName, this.state.type, this.state.selectedJob, this.state.parametersMap, this.state.cronExpression)
                        }
                    ]}>
                        <div className="form-group">
                            <div className="form-group">
                                <label for="jobname" className="Job-name">Job name:</label>

                                <Dropdown options={this.state.jobs} id="jobname" onChange={this.onSelection} value={this.state.selectedJob} placeholder="Select job name"/>
                            </div>
                            <div className="form-group">
                                <label className="form-check Trigger-Type">Trigger type:</label>
                                <label className="form-check-label" for="immediate">
                                    <input type="radio" onChange={this.onTypeChange} className="form-check-input p-10" name="trigger-type" id="immediate" value="Immediate"/>
                                    <span className="ml-20">Immediate</span>
                                </label>

                                <label className="ml-20 form-check-label" for="cron">
                                    <input type="radio" onChange={this.onTypeChange} className="form-check-input p-10" name="trigger-type" id="cron" value="Cron"/>
                                    <span className="ml-20">Cron</span>
                                </label>

                            </div>
                            {this.state.type === "Cron" ?
                                <div className="form-group">
                                    <label for="cronExpression" className="Trigger-name">Cron expression:</label>
                                <input type="text" onChange={this.onCronExpressionChange} className="Rectangle-2 form-control" id="cronExpression"/>
                                </div>
                            : null
                            }
                            <div className="form-group">
                                <label for="triggername" className="Trigger-name">Trigger name:</label>
                            <input type="text" onChange={this.onTriggerNameChange} className="Rectangle-2 form-control" id="triggername"/>
                            </div>
                            <div className="form-group">
                                <label for="parametermap" className="Parameter-map">Parameter map:</label>
                            <textarea onChange={this.onPramatersChange} className="form-control Rectangle-3" id="parametermap" rows="5"/>
                            </div>
                        </div>
                    </Modal>
                </div>
            </div>
        );
    }

    setFormData(data) {
        this.setState({formData: data});
    }

    createTrigger(triggerName, triggerType, jobName, jobData, cronExpression) {
        if (triggerName === undefined || triggerName === null ||
          triggerName.split(".").length < 2 || triggerName.split(".").length > 3) {
          alert('Enter trigger name in the format <groupname>.<triggername> or <grouponame>.<triggername>.<mode>');
          return;
        }
        let jobDataArray = [];
        if (jobData) {
          jobDataArray = jobData.split('\n');
        }
        let jobDataJson = '{';
        for (var i = 0; i < jobDataArray.length; i++) {
            let key = jobDataArray[i].split("=")[0];
            let value = jobDataArray[i].split("=")[1];
            jobDataJson += "\"" + key + "\": " + "\"" + value + "\",";
        }
        if (jobDataArray.length > 0) {
            jobDataJson = jobDataJson.substring(0, jobDataJson.length - 1);
        }
        jobDataJson += '}';
        let triggerGroup = triggerName.split(".")[0];
        if (triggerName.split(".").length == 2) {
            triggerName = triggerName.split(".")[1];
        } else {
            triggerName = triggerName.split(".")[1] + "." + triggerName.split(".")[2];
        }
        if (jobName === undefined || jobName === null) {
          alert('Select job');
          return;
        }
        jobName = jobName.value;
        let jobGroup = jobName.split(".")[0];
        jobName = jobName.split(".")[1];
        if (triggerType === 'Immediate') {
            createImmediateTriger(triggerName, triggerGroup, jobName, jobGroup, jobDataJson).then(res => {
                alert('Trigger created and started running');
            }).catch(err => {
                alert(err);
            });
        } else {
            if (cronExpression === undefined || cronExpression === null) {
              alert('Enter Cron expression');
              return;
            }
            createCronTriger(triggerName, triggerGroup, jobName, jobGroup, jobDataJson, cronExpression).then(res => {
                alert('Trigger created');
                location.reload();
            }).catch(err => {
                alert(err);
            });
        }
        this.setState({isCreateTrigger: false});
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
