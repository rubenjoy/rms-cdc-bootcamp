import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import AppBar from './scenes/main/scenes/AppBar';
import TabProfile from './scenes/main/scenes/AppBar/scenes/TabProfile';
import TabHistory from './scenes/main/scenes/AppBar/scenes/TabHistory';
import { Router, Route, IndexRoute, hashHistory } from 'react-router';

ReactDOM.render(
        <Router history={hashHistory}>
            <Route path="/" component={AppBar}>
                <IndexRoute component={TabProfile}/>
                <Route path="history" component={TabHistory} />
            </Route>
        </Router>,
  document.getElementById('root')
);
