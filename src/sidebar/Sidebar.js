import React, { Component } from 'react';
import triggerListIcon from '../../assets/svg/assets_History_2017-05-16/tab-icon-trigger-list.svg';
import historyIcon from '../../assets/svg/assets_triggerList_2017-05-16/tab-icon-history.svg';

import './Sidebar.css';


class Sidebar extends Component {
    render() {
        return (
            <div className="Sidebar">
                <div>
                    <img className="SidebarIcon" src={triggerListIcon} />
                    <h1 className="SidebarLabel">Trigger List</h1>
                </div>
                <div>
                    <img className="SidebarIcon" src={historyIcon} />
                    <h1 className="SidebarLabel">History</h1>
                </div>
                <div className="CreateTriggerButton">Create Trigger</div>
            </div>
        );
    }
}

export default Sidebar;
