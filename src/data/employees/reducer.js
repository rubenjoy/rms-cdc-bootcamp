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
                ...initialState,
                employees: action.payload
            };
        }
        // If no action match
        default: {
            return state;
        }
    }
};

export const currentEmployee = (state = initialState, action) => {
    switch (action.type) {
        case actionTypes.SET_CURR_EMPLOYEE: {
            return {
                ...initialState,
                currentEmployee: action.payload
            };
        }
        default: {
            return state;
        }
    }
};