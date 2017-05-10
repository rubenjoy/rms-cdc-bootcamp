import React, {Component} from 'react';
import AppBar from 'material-ui/AppBar';
import { Grid, Row, Col } from 'react-bootstrap';

import EmployeeListBar from '../components/EmployeeListBar';
import ToolBar from '../components/ToolBar';
import TabBar from '../components/TabBar';
import BarContent from '../components/BarContent';
import './AppLayout.css' ;

class App extends Component {
    constructor () {
        super();
    }

    render () { 
        return (
            <Grid fluid={true}>
                <Row><AppBar id='app-bar'/></Row>
                <Row><BarContent /></Row>
                <Row>
                    <Col sm={6} md={4}>
                        <Row><ToolBar /></Row>
                        <Row><EmployeeListBar /></Row>
                    </Col>
                    <Col sm={12} md={8}>
                        <Row><TabBar location={this.props.location.pathname} /></Row>
                        <Row>{this.props.children}</Row>
                    </Col>
                </Row>
            </Grid>
        )
    }

}

export default App;