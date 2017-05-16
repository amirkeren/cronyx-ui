import React, { Component } from 'react';
import Dropdown from 'react-dropdown';

import './style.css';

import {getAllJobs} from '../ajaxutils';

const options = [
  { value: 'one', label: 'One' },
  { value: 'two', label: 'Two' }
];

const defaultOption = options[0];

class CreateForm extends Component {
    render() {
        return (
          <div>
            <div className="row">
              <label for="jobname" className="Job-name">Job name:</label>
              <Dropdown options={
                  getAllJobs().then(res => {
                      console.log(res.data);
                      })
                  } id="jobname" onChange={this._onSelect} value={defaultOption} placeholder="Select job name" />
            </div>
            <div>
              <label className="Trigger-Type">Trigger type:
                <label for="immediate">Immediate</label>
                <input type="radio" className="Rectangle-2" name="trigger-type" id="immediate" value="Immediate"/>
                <label for="cron">Cron</label>
                <input type="radio" className="Rectangle-2" name="trigger-type" id="cron" value="Cron"/>
              </label>
            </div>
            <div>
              <label for="triggername" className="Trigger-name">Trigger name:</label>
              <input type="text" className="Rectangle-2" id="triggername"/>
            </div>
            <div>
              <label for="parametermap" className="Parameter-map">Parameter name:</label>
              <textarea className="Rectangle-2" id="parametermap"/>
            </div>
          </div>
        );
    }
}

export default CreateForm;
