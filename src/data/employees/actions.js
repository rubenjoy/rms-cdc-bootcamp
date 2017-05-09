import * as actionTypes from './actionTypes';

export const fetchEmployees = (employees) => {
    return {
        type: actionTypes.FETCH_EMPLOYEES,
        payload: employees
    };
};

// will be called when user clicks the employee on the list
export const setCurrEmployee = (employee) => {
    return{
        type: actionTypes.SET_CURR_EMPLOYEE,
        payload: employee
    };
};