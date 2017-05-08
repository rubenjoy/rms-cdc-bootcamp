import { createStore, combineReducers } from 'redux';
import * as employeesReducer from './employees/reducer';

// Middlewares
// const middleware = [];

// Store
const reducers = combineReducers({
    employees: employeesReducer.reducer
});

export default createStore(reducers);
