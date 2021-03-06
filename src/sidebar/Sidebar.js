import React, { Component } from 'react';

import triggerListInactiveIcon from '../../assets/svg/assets_History_2017-05-16 2/tab-icon-trigger-list.svg';
import historyInactiveIcon from '../../assets/svg/assets_triggerList_2017-05-16/tab-icon-history.svg';
import triggerListActiveIcon from '../../assets/svg/assets_triggerList_2017-05-16/tab-icon-trigger-list-focus.svg';
import historyActiveIcon from '../../assets/svg/assets_History_2017-05-16 2/tab-icon-history.svg';

import SidebarButton from "./sidebarButton/sidebarButton";
import './Sidebar.css';


class Sidebar extends Component {

    render() {
        return (
            <div className="Sidebar">
                <SidebarButton label="Trigger List" img={this.isButtonActive(0) ? triggerListActiveIcon : triggerListInactiveIcon} isButtonActive={this.isButtonActive(0)} onClick={() => this.props.handleTabClick(0)}/>
                <SidebarButton label="History" img={this.isButtonActive(1) ? historyActiveIcon : historyInactiveIcon} isButtonActive={this.isButtonActive(1)} onClick={() => this.props.handleTabClick(1)}/>
                <div className="CreateTriggerButton" onClick={this.props.handleCreateTriggerClick}>Create Trigger</div>
            </div>
        );
    }

    isButtonActive(buttonId){
        return this.props.activeButtonId === buttonId;
    }
}

export default Sidebar;
