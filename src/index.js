import React from 'react';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider'
import getMuiTheme from 'material-ui/styles/getMuiTheme'
import {fade} from 'material-ui/utils/colorManipulator'
import ReactDOM from 'react-dom';
import AppContainer from './containers/AppContainer'
import store from './data/store'

// Fixing error for unknown prop of "onTouchTap"
import injectTapEventPlugin from 'react-tap-event-plugin'
injectTapEventPlugin()

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
});

const routes = require('./routes').default(store);

ReactDOM.render(
    <MuiThemeProvider muiTheme={muiTheme}>
        <AppContainer store={store} routes={routes} />
    </MuiThemeProvider>,
    document.getElementById('root')
);
