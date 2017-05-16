import React, { Component } from 'react';
import logo from '../../assets/svg/assets_triggerList_2017-05-16/group.svg';
import './Header.css';


class Header extends Component {
    render() {
        return (
            <div className="Header">
                <img alt="" className="Logo" src={logo} />
                <div className="Line"/>
            </div>
        );
    }
}

export default Header;
