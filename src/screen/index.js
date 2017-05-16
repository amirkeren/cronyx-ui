import React, { Component } from 'react';
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
      triggers: []
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

  componentDidMount() {
    axios.get('triggers/all')
      .then(res => {
        this.setState({triggers: res.data});
        this.setState({triggersCopy: res.data});
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
                            <tr onClick={() => this.openInfoModal(trigger)}>
                                  <td className="large-cell">
                                    {trigger.triggerKey.name}
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
                        <pre className="trigger-info-pre">
                            {JSON.stringify(this.state.currentTriggerInfo, null, 4)}
                        </pre>
                    </Modal>
                : null}
            </div>
        );
    }
}

export default Screen;
