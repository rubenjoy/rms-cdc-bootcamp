import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import AppBar from './scenes/main/scenes/AppBar';
import { Router, Route, IndexRoute, hashHistory } from 'react-router';

ReactDOM.render(
        <Router history={hashHistory}>
            <Route path="/" component={AppBar}>
            </Route>
        </Router>,
  document.getElementById('root')
);
