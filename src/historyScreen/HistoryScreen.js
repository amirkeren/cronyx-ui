import React, { Component } from 'react';
import './HistoryScreen.css';


class HistoryScreen extends Component {
    render() {
        return (
            <div className="fullScreen">
                <iframe className="fullScreen" src="https://gsql.taboolasyndication.com/cgi-bin/dba/jade_history.cgi"/>
            </div>
        );
    }
}

export default HistoryScreen;