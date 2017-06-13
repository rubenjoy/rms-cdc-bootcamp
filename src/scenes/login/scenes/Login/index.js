import React, {Component} from 'react';
import RaisedButton from 'material-ui/RaisedButton';
import TextField from 'material-ui/TextField';

import {connect} from 'react-redux';
import { dispatchLogin } 
    from '../../../../data/account/actionCreators'
import { dispatchFetchEmployees } 
    from '../../../../data/employees/actionCreators'
import { dispatchRouter } 
    from '../../../../data/router/actionCreators'
import { Router, browserHistory } from 'react-router'
import './index.css' ;

class Login extends Component {

    constructor(props) {
        super(props);

        this.state = {
            account : {
                username: "",
                password: ""
            }
        }
        this.login = this.login.bind(this);
    }

    login () {
        dispatchLogin(this.props)(this.state.account, () => {
          dispatchRouter(this.props)('/profile');
          dispatchFetchEmployees(this.props)();
        });
    }

    handleChangeText = (event) => this.setState({
        account: {
            ...this.state.account,
            [event.target.name]: event.target.value
        }})


    render() {
        return (
            <div className="login">
              <div className="login-page">
                <div className="form">
                  <form>
                    <TextField
                      name="username"
                      placeholder="username"
                      value = {this.state.account.username}
                      onChange={this.handleChangeText}
                      floatingLabelFixed={true}
                    />
                    <TextField
                      name="password"
                      placeholder="password"
                      value = {this.state.account.password}
                      onChange={this.handleChangeText}
                      type="password"
                    /><br />
                    <RaisedButton label="Login" 
                        onClick={this.login}/>
                  </form>
                </div>
              </div>
                
            </div>
        );
    }
}

export default connect((state) => {
  return {
    accessToken: state.account.accessToken,
  }
})(Login)