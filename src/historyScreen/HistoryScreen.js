import React, { Component } from 'react';
import './HistoryScreen.css';


class HistoryScreen extends Component {
    render() {
        return (
            <div className="fullScreen">
                <div className="row no-gutters">
                    <h1 className="col-sm-3 history-header align-items-center">History</h1>
                </div>
                <div className="row no-gutters fullScreen">
                    <iframe className="fullScreen" frameBorder="0" src="https://gsql.taboolasyndication.com/cgi-bin/dba/jade_history.cgi"/>
                </div>
            </div>
        );
    }
}

export default HistoryScreen;