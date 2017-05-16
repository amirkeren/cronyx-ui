import React, { Component } from 'react';
import triggerListIcon from '../../assets/svg/assets_triggerList_2017-05-16/tab-icon-trigger-list-focus.svg';
import historyIcon from '../../assets/svg/assets_triggerList_2017-05-16/tab-icon-history.svg';

import './Sidebar.css';


class Sidebar extends Component {
    render() {
        return (
            <div className="Sidebar">
                <div>
                    <img className="sidebarIcon" src={triggerListIcon} />
                    <h1 className="sidebarLabel">Trigger List</h1>
                </div>
                <div>
                    <img className="sidebarIcon" src={historyIcon} />
                    <h1 className="sidebarLabel">History</h1>
                </div>
                <button className="sidebarButton">Create Trigger</button>
            </div>
        );
    }
}

export default Sidebar;
