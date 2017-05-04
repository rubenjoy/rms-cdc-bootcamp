import React, {Component} from 'react';
import Person from 'material-ui/svg-icons/action/account-circle';
import Settings from 'material-ui/svg-icons/action/settings';
import Power from 'material-ui/svg-icons/action/power-settings-new';
import '../styles/appbar.css';
import styles from '/index.scss';

import {
    indigo100,
    white
} from 'material-ui/styles/colors';

const iconStyles = {
    marginRight: 5,
};

const avatarStyle = {
    height: 50,
    width: 50
};

class BarContent extends Component {

    constructor () {
        super();
        this.state = {
            name: "Name",
            grade: "Grade"
        }
    }
    
    render () {

    }
}
    return (
        <div id="app-bar">
            <div>
                <Person color={indigo100}
                        style={avatarStyle}
                        id="avatar"
                />
                <div id="avatar-profile">{this.state.name} <br />
                    {this.state.grade}
                </div>
                <div id="right-appbar">
                    <Settings color={white} style={iconStyles} />
                    <Power color={white} />
                </div>
            </div>
        </div>
    );
}));

export default RMSAppbar