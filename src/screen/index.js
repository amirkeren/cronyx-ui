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
      currentDeleteTrigger: null,
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

    getDeleteModalSubtitle () {
        if (this.state.currentDeleteTrigger) {
            return `Are you sure you want to delete ${this.state.currentDeleteTrigger.triggerKey.group}.${this.state.currentDeleteTrigger.triggerKey.name} trigger?`;
        }
        return '';
    }

    getInfoModalSubtitle () {
        if (this.state.currentTrigger) {
            return `${this.state.currentTrigger.triggerKey.group}.${this.state.currentTrigger.triggerKey.name}`;
        }
        return '';
    }

    openDeleteModal(trigger) {
        const {name, group} = trigger.triggerKey;
        triggerInfo(name, group).then(resp => {
            this.setState({
                currentDeleteTrigger: trigger
            });
        });
    }

    deleteTrigger() {
        const trigger = this.state.currentDeleteTrigger;
        axios.post('triggers/delete', querystring.stringify({ name: trigger.triggerKey.name, group: trigger.triggerKey.group }))
        .then(res => {
          let triggers = this.state.triggersCopy;
          const deleteItem = this.state.currentDeleteTrigger;
          const updateTriggers = triggers.filter(tr => tr.triggerKey.name !== deleteItem.triggerKey.name && tr.triggerKey.group !== deleteItem.triggerKey.group)
          this.setState({ triggersCopy: updateTriggers });
          //this.setState({ triggers: updateTriggers });
          this.setState({ currentDeleteTrigger: null });
        })
        .catch(res => {
          console.log(res);
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
                                      <img src={deleteIcon} alt="" className="delete-icon" onClick={() => this.openDeleteModal(trigger)}/>
                                  </td>
                            </tr>
                        )}

                    </tbody>
                </table>
                </div>
                <Modal title="Trigger Info"
                        subtitle={this.getInfoModalSubtitle()}
                        active={!!this.state.currentTrigger}
                        buttons={[{
                            text: "Close",
                            primary: true,
                            onClick: () => this.setState({ currentTrigger: null })
                        }]}>
                    <JSONTree data={this.state.currentTriggerInfo || {}}
                              theme={{tree: { backgroundColor: 'transparent' },
                                  label:{color: '#929292'},
                                  valueText:{color: '#929292'},
                                  itemRange:{color: '#929292'},
                                  arrowSign:{borderTopColor: '#929292'},
                                  nestedNodeItemString:{color: '#929292'}}}/>
                </Modal>

                <Modal title="Delete Trigger"
                        active={!!this.state.currentDeleteTrigger}
                        subtitle={this.getDeleteModalSubtitle()}
                        buttons={[
                        {
                            text: "Delete This Trigger",
                            primary: true,
                            onClick: () => this.deleteTrigger()
                        },
                        {
                            text: "Cancel",
                            onClick: () => this.setState({ currentDeleteTrigger:  null })
                        }
                        ]}>

                </Modal>
            </div>
        );
    }
}

export default Screen;
