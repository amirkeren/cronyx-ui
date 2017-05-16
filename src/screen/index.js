import React, { Component } from 'react';
import searchIcon from '../../assets/svg/assets_History_2017-05-16 2/ic-search.svg';
import moment from 'moment';

import './style.css';

import axios from 'axios';

var querystring = require('querystring');

axios.defaults.baseURL = 'manage/scheduling/';



class Screen extends Component{
  constructor() {
    super();

    this.state = {
      triggers: []
    };
  }

  getDate(timestamp) {
      return moment(timestamp).calendar().split(" at").join(",");
  }

  componentDidMount() {
    axios.get('triggers/all')
      .then(res => {
        this.setState({triggers: res.data});
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

                {/*}<ul>
                  {this.state.triggers.map(trigger =>
                    <li key={trigger.triggerKey.name}>{trigger.triggerKey.name}</li>
                  )}
                </ul>*/}

                <table className="table">
                    <thead>
                        <tr>
                            <th >Trigger Name </th>
                            <th >Previous Run</th>
                            <th >Next Run</th>
                            <th></th>
                            <th></th>
                        </tr>
                    </thead>
                    <tbody>
                        {this.state.triggers.map(trigger =>
                            <tr>
                                  <td>
                                    {trigger.triggerKey.name}
                                  </td>
                                  <td >
                                    {this.getDate(trigger.triggerData._PREVIOUS_FIRING_TIME)}
                                  </td>
                                  <td >
                                      {this.getDate(trigger.triggerData._NEXT_FIRING_TIME)}
                                  </td>
                                  <td >
                                      {trigger.triggerData._TRIGGER_STATUS}
                                  </td>
                                  <td >
                                      delete
                                  </td>
                            </tr>
                        )}

                    </tbody>
                </table>
                </div>
            </div>
        );
    }
}

export default Screen;
