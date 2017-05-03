import * as actionTypes from './actionTypes'

export const fetchEmployees = (employees) => {
    return {
        type: actionTypes.FETCH_EMPLOYEES,
        payload: employees
    }
}