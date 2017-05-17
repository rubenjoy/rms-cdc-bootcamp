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
        // Get employees
        case actionTypes.GET_EMPLOYEES:{
            return [...state.employees];
        }
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
        // Add employee
        case actionTypes.ADD_EMPLOYEE:{
            return {
                ...state,
                employees: [
                    ...state.employees,
                    action.payload
                ]
            };
        }
        // Delete employee
        case actionTypes.DELETE_EMPLOYEE:{
            let index = state.employees.findIndex((x) => x.empId === action.payload); 
            return {
                ...state,
                employees: [
                ...state.employees.slice(0, index),
                ...state.employees.slice(index + 1)
                ]
            };
        }
        // Edit employee
        case actionTypes.EDIT_EMPLOYEE:{
            return {
                ...state,
                employees: editEmployee(state, action)
            };
        }

        // Current employee
        case actionTypes.SET_CURR_EMPLOYEE: {
            return {
                ...state,
                currentEmployee: action.payload
            };
        }

        // Current employee
        case actionTypes.SET_NEW_EMPLOYEE: {
            return {
                ...initialState,
                newEmployee: action.payload
            };
        }
        
        // If no action match
        default: {
            return state;
        }
    }
};


function editEmployee(state = initialState.employees, action) {
    const data = action.payload;
    const index = state.employees.findIndex(s => s.empId === data.empId)
    if (index !== -1) {
        const states = [...state.employees]
        states[index] = data ? data : null;
        return states;
    } else {
        return state;
    }

    return state;
}