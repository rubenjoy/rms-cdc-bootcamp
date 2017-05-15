import * as action from './actions';
import 'whatwg-fetch';
import { patchEmployee, getEmployee } from '../../utils/lib/employeeApiHelpers';

const ENDPOINT_URL = 'https://rmsbackendspringstaging.herokuapp.com/employees';

export const dispatchFetchEmployees = ({dispatch}) => {
    return () => {
        fetch(ENDPOINT_URL)
            .then(response => response.json())
            .then(json => {
                debugger
                dispatch(action.fetchEmployees(json._embedded.employees));
            })
            .catch(error => {
                alert('Error occured');
                console.log(error)
            });
    }
};



export const dispatchUpdateEmployees  = ({dispatch}) => {
    return (patchedEmployee) => {
            patchEmployee(patchedEmployee, patchedEmployee.empId, patchedEmployee.etag)
            .then(response => response.json())
            .then(json => {
                dispatch(action.editEmployee(patchedEmployee));
                dispatch(action.setCurrEmployee(patchedEmployee));
            })
            .catch(() => {
                debugger
             //   this.setLoaded();
             //   this.setErrorMessage(errorMessage.netError);
            });
    }
}
/*
const loadSingleEmployee = (empId) => {
    // console.log("load single employee " + empId);

    let fetchedEmployee = {};
    let success = true;
  //  this.setLoading();

    getEmployee(empId)
        .then((response) => {
            if (response.ok) {
                fetchedEmployee.etag = response.headers.get("Etag");
                return response.json();
            } else {
                success = false;
              //  this.setErrorMessage(errorMessage.general);
              //  this.setLoaded();
            }
        })
        .catch(() => {
            success = false;
           // this.setLoaded();
            //this.setErrorMessage(errorMessage.netError);
        })
        .then((json) => {
            if (success) {
                fetchedEmployee = {
                    ...fetchedEmployee,
                    ...json
                }
                // console.log("reading response: " + JSON.stringify(fetchedEmployee));
                this.setCurrentEmployee(fetchedEmployee.empId);
              //  this.replaceEmployee(fetchedEmployee);
            }
           // this.setLoaded();

        })
}*/

export const setCurrentEmployee = (employee) => (dispatch) => (
    dispatch(action.setCurrEmployee(employee))
);