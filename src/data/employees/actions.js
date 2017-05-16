import * as actionTypes from './actionTypes';

export const fetchEmployees = (employees) => {
    return {
        type: actionTypes.FETCH_EMPLOYEES,
        payload: employees
    };
};

export const addEmployee = (employee) => {
    return {
        type: actionTypes.ADD_EMPLOYEE,
        payload: employee
    };
};

export const editEmployee = (employee) => {
    return {
        type: actionTypes.EDIT_EMPLOYEE,
        payload: employee
    };
};

export const deleteEmployee = (id) => {
	return {
		type: actionTypes.DELETE_EMPLOYEE,
        payload: id
	};
};

// will be called when user clicks the employee on the list
export const setCurrEmployee = (employee) => {
    return{
        type: actionTypes.SET_CURR_EMPLOYEE,
        payload: employee
    };
};