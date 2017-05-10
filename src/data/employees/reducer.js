import * as actionTypes from './actionTypes';

// State by default
const initialState = {
    employees: [],
    currentEmployee: {},
    newEmployee: {}
};

// Process the data based on action taken (immutable)
export const reducer = (state = initialState, action) => {
    switch(action.type) {
        // On fetch
        case actionTypes.FETCH_EMPLOYEES:{
            return {
                ...state,
                employees: action.payload,
                // Clear these data
                currentEmployee: {},
                newEmployee: {}
            };
        }

        // Current employee
        case actionTypes.SET_CURR_EMPLOYEE: {
            return {
                ...state,
                currentEmployee: action.payload
            };
        }
        
        // If no action match
        default: {
            return state;
        }
    }
};