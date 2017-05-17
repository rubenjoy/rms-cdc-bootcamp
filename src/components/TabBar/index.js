import React, {Component} from 'react'
import {Tabs, Tab} from 'material-ui/Tabs'
import Person from 'material-ui/svg-icons/social/person'
import Layer from 'material-ui/svg-icons/maps/layers'
import WC from 'material-ui/svg-icons/notification/wc'
import History from 'material-ui/svg-icons/action/history';
import Location from 'material-ui/svg-icons/communication/location-on';
import Home from 'material-ui/svg-icons/action/home';
import FontIcon from 'material-ui/FontIcon'
import { Link } from 'react-router'

const styles = {
    backgroundColor: "#5c6bc0"
}

class TabBar extends Component {

    constructor () {
        super()
    }

    render () {
        let path = location;
        if (path === "/") path = "/profile";
//        if (path === "/") path = "/grades";

        return (
            <div id="tabs">
                <Tabs tabItemContainerStyle={styles} value={path}>
                    <Tab icon={<Person />} containerElement={<Link to="/profile"/>} value="/profile" />
                    <Tab icon={<History />} containerElement={<Link to="/history"/>} value="/history" />
                    <Tab icon={<Layer />} containerElement={<Link to="/grades"/>} value="/grades" />
                    <Tab icon={<WC />} containerElement={<Link to="/family"/>} value="/family" />
                    <Tab icon={<Home />} containerElement={<Link to="/address"/>} value="/address" />
                    <Tab icon={<Location />} containerElement={<Link to="/locations"/>} value="/locations" />
                </Tabs>
            </div>
        )
    }
}

TabBar.propTypes = {
    location: React.PropTypes.string
};

export default TabBar