import { applyMiddleware, createStore, combineReducers, compose } from 'redux';
import * as employeesReducer from './employees/reducer';
import * as accountReducer from './account/reducer';
import thunk from 'redux-thunk';

// Middlewares
const middlewares = [thunk];

// For debug purpose (redux developer tool on chrome)
const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;

// Store
const reducers = combineReducers({
    employees: employeesReducer.reducer,
    account: accountReducer.reducer
});

export default createStore(
    reducers,
    composeEnhancers(
        applyMiddleware(...middlewares)
    )
);
