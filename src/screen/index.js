import React, { Component } from 'react';
import searchIcon from '../../assets/svg/assets_History_2017-05-16/ic-search.svg';

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


  componentDidMount() {
    axios.get('triggers/all')
      .then(res => {
        this.setState({triggers: res.data});
      });
}

    render() {
        return(
            <div className="main-screen-wrapper">
                <div className="row triggers-header align-items-center">
                    <h1 className="col-sm-3 triggers-list-header">Triggers List</h1>
                    <div className="offset-sm-4 col-sm-4">
                        <img src={searchIcon} alt="" className="search-icon"/>
                        <input className="search-box" placeholder="type trigger name" />
                    </div>
                </div>
                <div className="row table-wrapper">

                {/*}<ul>
                  {this.state.triggers.map(trigger =>
                    <li key={trigger.triggerKey.name}>{trigger.triggerKey.name}</li>
                  )}
                </ul>*/}

                <table>
                <thead>
                  <th> trigger name </th>
                  <th> status</th>
                </thead>
                <tbody>
                {this.state.triggers.map(trigger =>
                  <tr>
                  <td>
                    {trigger.triggerKey.name}
                  </td>
                  <td>
                    {trigger.triggerData._TRIGGER_STATUS}
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
