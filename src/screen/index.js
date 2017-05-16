import React, { Component } from 'react';
import JSONTree from 'react-json-tree';
import searchIcon from '../../assets/svg/assets_triggerList_2017-05-16/ic-search.svg';
import playIcon   from '../../assets/svg/assets_triggerList_2017-05-16/ic-play.svg';
import pauseIcon  from '../../assets/svg/assets_triggerList_2017-05-16/ic-pause.svg';
import deleteIcon from '../../assets/svg/assets_triggerList_2017-05-16/ic-delete.svg';

import moment from 'moment';
import Modal from '../Modal';
import {triggerInfo} from '../ajaxutils';

import './style.css';

import axios from 'axios';
var querystring = require('querystring');


axios.defaults.baseURL = 'manage/scheduling/';



class Screen extends Component{
  constructor() {
    super();

    this.state = {
      triggers: [],
      currentDeleteTrigger: null
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



  componentDidMount() {
    axios.get('triggers/all')
      .then(res => {
        this.setState({triggers: res.data});
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
          let triggers = this.state.triggers;
          const deleteItem = this.state.currentDeleteTrigger;
          const updateTriggers = triggers.filter(tr => tr.triggerKey.name !== deleteItem.triggerKey.name && tr.triggerKey.group !== deleteItem.triggerKey.group)
          this.setState({ triggers: updateTriggers });
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
                        <input className="search-box" placeholder="type trigger name" />
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
                        {this.state.triggers.map(trigger =>
                            <tr>
                                  <td className="large-cell name-cell" onClick={() => this.openInfoModal(trigger)}>
                                    {`${trigger.triggerKey.name}.${trigger.triggerKey.group}`}
                                  </td>
                                  <td >
                                    {this.getDate(trigger.triggerData._PREVIOUS_FIRING_TIME)}
                                  </td>
                                  <td >
                                      {this.getDate(trigger.triggerData._NEXT_FIRING_TIME)}
                                  </td>

                                  <td >
                                      {trigger.triggerData._TRIGGER_STATUS === "ACTIVE" &&
                                        <img src={pauseIcon} alt="" className="pause-icon status-btn" onClick={() => this.pauseTrigger(trigger)}/>
                                      }
                                      {trigger.triggerData._TRIGGER_STATUS === "PAUSED" &&
                                        <img src={playIcon} alt="" className="play-icon status-btn" onClick={() => this.resumeTrigger(trigger)}/>
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

                {this.state.currentDeleteTrigger ?
                    <Modal title="Delete Trigger"
                            subtitle={`Are you sure you want to delete ${this.state.currentDeleteTrigger.triggerKey.group}.${this.state.currentDeleteTrigger.triggerKey.name} trigger?`}
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
                : null}
            </div>
        );
    }
}

export default Screen;
