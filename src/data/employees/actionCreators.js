import * as action from './actions';
import 'whatwg-fetch';
import { patchEmployee, getEmployee, addEmployee, deleteEmployee } 
    from '../../utils/lib/employeeApiHelpers';

const ENDPOINT_URL = 'https://rmsbackendspringstaging.herokuapp.com/employees';

export const dispatchFetchEmployees = ({dispatch}) => {
    return () => {
        fetch(ENDPOINT_URL)
            .then(response => response.json())
            .then(json => {
                dispatch(action.fetchEmployees(json._embedded.employees));
            })
            .catch(error => {
                alert('Error occured');
                console.log(error)
            });
    }
};

export const dispatchAddEmployee  = ({dispatch}) => {
    return (employee, callback) => {
            addEmployee(employee)
            .then(response => {
                if (response.ok) return response.json(); 
                throw 'error';
            })
            .then(json => {
                    dispatch(action.addEmployee(json));
                    dispatch(action.setCurrEmployee(json.empId));
                    if (callback && typeof callback === "function") callback();
            })
            .catch(error => {
                alert('Error occured');
                console.log(error)
            });
    }
}

export const dispatchDeleteEmployee  = ({dispatch}) => {
    return (id) => {
            deleteEmployee(id)
            .then(response => {
                if (response.ok) {
                    dispatch(action.deleteEmployee(id));
                } else {
                   alert('Error occured');
                   console.log(response);
                }
            })
            .catch(error => {
                alert('Error occured');
                console.log(error)
            });
    }
}

export const dispatchUpdateEmployee  = ({dispatch}) => {
    return (patchedEmployee) => {
            patchEmployee(patchedEmployee, patchedEmployee.empId, patchedEmployee.etag)
            .then(response => {
                if (response.ok)  return response.json()
                throw 'error occured';
            })
            .then(json => {
                dispatch(action.editEmployee(patchedEmployee));
                dispatch(action.setCurrEmployee(patchedEmployee.empId));
            })
            .catch(error => {
                alert('Error occured');
                console.log(error)
            });
    }
}

export const setCurrentEmployee = ({dispatch}) => (employee) => dispatch(action.setCurrEmployee(employee)) 