import React, {Component} from 'react';
import getMuiTheme from 'material-ui/styles/getMuiTheme'
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider'
import {fade} from 'material-ui/utils/colorManipulator'
import MaterialAppBar from 'material-ui/AppBar'
import { Grid, Row, Col } from 'react-bootstrap'

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

const style = {position: "absolute", zIndex: -1}

class AppBar extends  Component {

	render () {
		return (
			<MuiThemeProvider muiTheme={muiTheme}>
				<Grid fluid={true}>
					<Row>TEST</Row>
				</Grid>
			</MuiThemeProvider>
		)
	}

}

export default AppBar;