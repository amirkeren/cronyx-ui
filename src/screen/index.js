import React, { Component } from 'react';
import JSONTree from 'react-json-tree';
import searchIcon from '../../assets/svg/assets_triggerList_2017-05-16/ic-search.svg';
import deleteIcon from '../../assets/svg/assets_triggerList_2017-05-16/ic-delete.svg';

import moment from 'moment';
import Modal from '../Modal';
import {triggerInfo} from '../ajaxutils';
import Switch from 'react-toggle-switch';

import './style.css';
import "../../node_modules/react-toggle-switch/dist/css/switch.min.css"

import axios from 'axios';
import _ from 'lodash';
var querystring = require('querystring');


axios.defaults.baseURL = 'manage/scheduling/';



class Screen extends Component{
  constructor() {
    super();

    this.handleFilterKeyUp = this.filterTriggers.bind(this, 'filterTriggersInput');

    this.state = {
      triggers: [],
      triggersCopy: []
    };
  }

  getDate(timestamp) {
      return moment(timestamp).calendar().split(" at").join(",");
  }

  pauseTrigger(trigger) {
    axios.post('triggers/pause', querystring.stringify({ name: trigger.triggerKey.name, group: trigger.triggerKey.group }))
      .then(res => {
        var triggers = this.state.triggers;
        var item = triggers.filter(tr =>  tr.triggerKey.name === trigger.triggerKey.name && tr.triggerKey.group === trigger.triggerKey.group)[0];
        item.triggerData._TRIGGER_STATUS = "PAUSED";
        this.setState({ triggers });
      })
      .catch(res => {
        console.log("error: " + res);
      });
  }

  resumeTrigger(trigger) {
    axios.post('triggers/resume', querystring.stringify({ name: trigger.triggerKey.name, group: trigger.triggerKey.group }))
      .then(res => {
        var triggers = this.state.triggers;
        var item = triggers.filter(tr =>  tr.triggerKey.name === trigger.triggerKey.name && tr.triggerKey.group === trigger.triggerKey.group)[0];
        item.triggerData._TRIGGER_STATUS = "ACTIVE";
        this.setState({ triggers });
      })
      .catch(res => {
        console.log(res);
      });
  }

  deleteTrigger(trigger) {
    axios.post('triggers/delete', querystring.stringify({ name: trigger.triggerKey.name, group: trigger.triggerKey.group }))
      .then(res => {
        console.log(res);
      })
      .catch(res => {
        console.log(res);
      });
  }

  filterTriggers(refName, e) {
    const triggers = this.state.triggers;
    const filterText = e.target.value;
    let triggersCopyObj = this.state.triggersCopy;
    if (filterText) {
      triggersCopyObj = _.filter(triggers, function(o) {
        let triggerFullName = o.triggerKey.group + "." + o.triggerKey.name;
        return triggerFullName.toLowerCase().includes(filterText.toLowerCase());
      });
    } else {
      triggersCopyObj = triggers;
    }
    this.setState({ triggersCopy: triggersCopyObj });
  }

  componentDidMount() {
    axios.get('triggers/all')
      .then(res => {
        const sortedTriggers = _.sortBy(res.data, ['triggerKey.group', 'triggerKey.name']);
        this.setState({triggers: sortedTriggers});
        this.setState({triggersCopy: sortedTriggers});
      });
  }

    openInfoModal (trigger) {
        const {name, group} = trigger.triggerKey;
        triggerInfo(name, group).then(resp => {
            this.setState({
                currentTrigger: trigger,
                currentTriggerInfo: resp.data
            });
        });
    }

    render() {
        return(
            <div className="main-screen-wrapper">
                <div className="row triggers-header align-items-center no-gutters">
                    <h1 className="col-sm-3 triggers-list-header">Triggers List</h1>
                    <div className="offset-sm-4 col-sm-4">
                        <img src={searchIcon} alt="" className="search-icon"/>
                        <input className="search-box" placeholder="type trigger name" onKeyUp={this.handleFilterKeyUp} ref="filterTriggersInput"/>
                    </div>
                </div>
                <div className="row table-wrapper no-gutters">

                <table className="table">
                    <thead>
                        <tr>
                            <th className="large-cell">Trigger Name </th>
                            <th>Previous Run</th>
                            <th>Next Run</th>
                            <th></th>
                            <th></th>
                        </tr>
                    </thead>
                    <tbody>
                        {this.state.triggersCopy.map(trigger =>
                            <tr>
                                  <td className="large-cell name-cell" onClick={() => this.openInfoModal(trigger)}>
                                    {`${trigger.triggerKey.group}.${trigger.triggerKey.name}`}
                                  </td>
                                  <td >
                                    {this.getDate(trigger.triggerData._PREVIOUS_FIRING_TIME)}
                                  </td>
                                  <td >
                                      {this.getDate(trigger.triggerData._NEXT_FIRING_TIME)}
                                  </td>

                                  <td >
                                      {trigger.triggerData._TRIGGER_STATUS === "ACTIVE" &&
                                        <div>
                                          <Switch on={true} onClick={() => this.pauseTrigger(trigger)}/>
                                        </div>
                                      }
                                      {trigger.triggerData._TRIGGER_STATUS === "PAUSED" &&
                                        <div>
                                          <Switch onClick={() => this.resumeTrigger(trigger)}/>
                                        </div>
                                      }
                                  </td>
                                  <td>
                                      <img src={deleteIcon} alt="" className="delete-icon"/>
                                  </td>
                            </tr>
                        )}

                    </tbody>
                </table>
                </div>
                {this.state.currentTrigger ?
                    <Modal title="Trigger Info"
                            subtitle={`${this.state.currentTrigger.triggerKey.group}.${this.state.currentTrigger.triggerKey.name}`}
                            buttons={[{
                                text: "Close",
                                primary: true,
                                onClick: () => this.setState({ currentTrigger: null })
                            }]}>
                        <JSONTree data={this.state.currentTriggerInfo}
                            theme={{tree: { backgroundColor: 'transparent' }}}/>
                    </Modal>
                : null}
            </div>
        );
    }
}

export default Screen;
