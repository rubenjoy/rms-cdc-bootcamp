import React, {Component} from 'react';
import getMuiTheme from 'material-ui/styles/getMuiTheme'
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider'
import {fade} from 'material-ui/utils/colorManipulator'
import AppBar from 'material-ui/AppBar'
import { Grid, Row, Col } from 'react-bootstrap'

import EmployeeListBar from '../EmployeeListBar'
import ToolBar from '../ToolBar'
import TabBar from '../TabBar'
import BarContent from '../BarContent'
import './index.css' 

import {
    cyan500,
    cyan700,
    grey400,
    pinkA200,
    grey100,
    grey500,
    darkBlack,
    white,
    grey300,
    fullBlack,
    indigo500
} from 'material-ui/styles/colors';

const muiTheme = getMuiTheme({
    palette: {
        primary1Color: indigo500,
        primary2Color: cyan700,
        primary3Color: grey400,
        accent1Color: pinkA200,
        accent2Color: grey100,
        accent3Color: grey500,
        textColor: darkBlack,
        alternateTextColor: white,
        canvasColor: white,
        borderColor: grey300,
        disabledColor: fade(darkBlack, 0.3),
        pickerHeaderColor: cyan500,
        clockCircleColor: fade(darkBlack, 0.07),
        shadowColor: fullBlack,
    }
}) 

class App extends Component {
    constructor () {
        super(); 
        this.state = {
            dummyPathname: "/profile"
        }
    }

    render () { 

        return (
            <MuiThemeProvider muiTheme={muiTheme}>
                <Grid fluid={true}>
                    <Row><AppBar id='app-bar'/></Row>
                    <Row><BarContent /></Row>
                    <Row>
                        <Col sm={6} md={4}>
                            <Row><ToolBar /></Row>
                            <Row><EmployeeListBar /></Row>
                        </Col>
                        <Col sm={12} md={8}>
                            <Row><TabBar location={this.state.dummyPathname} /></Row>
                            <Row>{this.props.children}</Row>
                        </Col>
                    </Row>
                </Grid>
            </MuiThemeProvider>
        )
    }

}

export default App;