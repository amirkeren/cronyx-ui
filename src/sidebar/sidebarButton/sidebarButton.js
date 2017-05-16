import React, { Component } from 'react';
import './sidebarBurron.css';


class SidebarButton extends Component {
    render() {
        return (
            <div onClick={this.props.onClick}>
                <img className="SidebarIcon" src={this.props.img}/>
                <h1 className={this.props.isButtonActive ? "SidebarActiveLabel" : "SidebarInactiveLabel"}>{this.props.label}</h1>
            </div>
        );
    }
}

export default SidebarButton;
