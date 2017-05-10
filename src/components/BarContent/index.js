import React, {Component} from 'react';
import Person from 'material-ui/svg-icons/action/account-circle';
import Settings from 'material-ui/svg-icons/action/settings';
import Power from 'material-ui/svg-icons/action/power-settings-new';
import './index.css';

import {
    indigo100,
    white
} from 'material-ui/styles/colors';



class BarContent extends Component {

    constructor () {
        super();
        this.state = {
            dummy : {
                name: "Name",
                grade: "Grade"
            }
        }
    }
    
    render () {
        return (
            <div id="bar-content">
                <div>
                    <Person color={indigo100}
                            className="avatar-style"
                            id="avatar"
                    />
                    <div id="avatar-profile">{this.state.dummy.name} <br />
                        {this.state.dummy.grade}
                    </div>
                    <div id="right-appbar">
                        <Settings color={white} 
                            className="icon-style"
                        />
                        <Power color={white} />
                    </div>
                </div>
            </div>
        );

    }
};

export default BarContent