import React, { Component } from 'react';
import Dropdown from 'react-dropdown';

import './style.css';

import {getAllJobs} from '../ajaxutils';

class CreateForm extends Component {

    constructor() {
        super();
        this.state = {
            jobs: [],
            selectedJob: ""
        };

        getAllJobs().then(res => {
            this.setState({jobs: res.data.map(j => j.key.group + "." + j.key.name)});
        });
    }

    onSelection(selected) {
        this.setState({selectedJob: selected})
    }

    render() {
        return (
          <div className="form-group">
            <div className="form-group">
              <label for="jobname" className="Job-name">Job name:</label>

              <Dropdown options={this.state.jobs} id="jobname" onChange={this.onSelection} value={this.state.selectedJob} placeholder="Select job name" />
            </div>
            <div className="form-group">
              <label className="form-check Trigger-Type">Trigger type:</label>
          <label className="form-check-label" for="immediate">
                    <input type="radio" className="form-check-input p-10" name="trigger-type" id="immediate" value="Immediate"/>
                <span className="ml-20">Immediate</span>
                </label>

                <label className="ml-20 form-check-label" for="cron">
                    <input type="radio" className="form-check-input p-10" name="trigger-type" id="cron" value="Cron"/>
                <span className="ml-20">Cron</span>
                </label>

            </div>
            <div className="form-group">
              <label for="triggername" className="Trigger-name">Trigger name:</label>
          <input type="text" className="Rectangle-2 form-control" id="triggername"/>
            </div>
            <div className="form-group">
              <label for="parametermap" className="Parameter-map">Parameter name:</label>
              <textarea className="form-control Rectangle-3" id="parametermap" rows="5"/>
            </div>
          </div>
        );
    }
}

export default CreateForm;
