import React, {Component} from 'react';
import FlatButton from 'material-ui/FlatButton';
import TextField from 'material-ui/TextField';

import {connect} from 'react-redux';
import { dispatchLogin } 
    from '../../../../data/account/actionCreators'

class Login extends Component {

    constructor(props) {
        super(props);

        this.state = {
            account : {
                username: null,
                password: null
            }
        }
        this.login = this.login.bind(this);
    }

    login () {
        debugger
        dispatchLogin(this.props)(this.state.account);
    }

    handleChangeText = (event) => this.setState({
        account: {
            ...this.state.account,
            [event.target.name]: event.target.value
        }})


    render() {

        return (
            <div>

                <TextField
                  name="username"
                  value = {this.state.account.username}
                  hintText="Hint Text"
                  onChange={this.handleChangeText}
                  floatingLabelText="Fixed Floating Label Text"
                  floatingLabelFixed={true}
                /><br />
                <TextField
                  name="password"
                  value = {this.state.account.password}
                  onChange={this.handleChangeText}
                  hintText="Password Field"
                  floatingLabelText="Password"
                  type="password"
                /><br />
                <FlatButton label="Login" 
                    onClick={this.login}/>
                
            </div>
        );
    }
}

export default connect()(Login)