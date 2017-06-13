import { applyMiddleware, createStore, combineReducers, compose } from 'redux';
import * as employeesReducer from './employees/reducer';
import * as accountReducer from './account/reducer';
import thunk from 'redux-thunk';
import { browserHistory } from 'react-router';
import { routerMiddleware, routerReducer } from 'react-router-redux';

const customMiddleWare = store => next => action => {
debugger
  console.log("Middleware triggered:", action);
  next(action);
}

// Middlewares
const middlewares = [thunk, customMiddleWare, routerMiddleware(browserHistory)];

// For debug purpose (redux developer tool on chrome)
const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;

// Store
const reducers = combineReducers({
    employees: employeesReducer.reducer,
    account: accountReducer.reducer,
    routing: routerReducer
});

export default createStore(
    reducers,
    composeEnhancers(
        applyMiddleware(...middlewares)
    )
);
