import { applyMiddleware, createStore, combineReducers, compose } from 'redux';
import * as employeesReducer from './employees/reducer';
import thunk from 'redux-thunk';

// Middlewares
<<<<<<< HEAD
const middlewares = [thunk];

const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;
=======
// const middleware = [thunk];
>>>>>>> 9d55fcfde77241bb8ad3886466c85c099950206c

// Store
const reducers = combineReducers({
    employees: employeesReducer.reducer,
    currentEmployee: employeesReducer.currentEmployee
});

<<<<<<< HEAD
export default createStore(
    reducers,
    composeEnhancers(
        applyMiddleware(...middlewares)
    )
);
=======
export default createStore (reducers);
>>>>>>> 9d55fcfde77241bb8ad3886466c85c099950206c
