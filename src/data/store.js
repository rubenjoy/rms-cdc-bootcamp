import { createStore, combineReducers } from 'redux';
import * as employeesReducer from './employees/reducer';
import thunk from 'redux-thunk';

// Middlewares
// const middleware = [thunk];

// Store
const reducers = combineReducers({
    employees: employeesReducer.reducer,
    currentEmployee: employeesReducer.currentEmployee
});

export default createStore (reducers);
