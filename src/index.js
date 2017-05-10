import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './components/AppLayout';
import TabProfile from './scenes/main/scenes/TabProfile';
import TabHistory from './scenes/main/scenes/TabHistory';
import { Router, Route, IndexRoute, hashHistory } from 'react-router';

ReactDOM.render(
        <Router history={hashHistory}>
            <Route path="/" component={App}>
                <IndexRoute component={TabProfile}/>
                <Route path="history" component={TabHistory} />
            </Route>
        </Router>,
  document.getElementById('root')
);
