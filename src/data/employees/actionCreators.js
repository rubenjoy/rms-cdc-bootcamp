import * as action from './actions';
import 'whatwg-fetch';
import { patchEmployee, getEmployee, addEmployee, deleteEmployee, setupRequest, putProjects, putLocations,
         searchEmployeesByName } 
    from '../../utils/lib/employeeApiHelpers';

const ENDPOINT_URL = 'https://rmsbackendspringstaging.herokuapp.com/employees';
const Paging_Info = 10;
const Sort_By = [ { sortBy: "dateAdded", sortType: "desc" } ];

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

const setCurrEmployee = (dispatch, empId) => {
    let fetchedEmployee = {}
    getEmployee(empId)
        .then ((response) => {
            if(response.ok){
                fetchedEmployee.etag = response.headers.get("Etag");
                return response.json();
            }
        })
        .then((json) => {
            fetchedEmployee = {
                ...fetchedEmployee,
                ...json
            }
            dispatch(action.setCurrEmployee(fetchedEmployee));
        });
}

export const dispatchAddEmployee  = ({dispatch}) => {
    return (employee, callback) => {
            addEmployee(employee)
            .then(response => {
                if (response.ok) return response.json(); 
                throw new Error("error");
            })
            .then(json => {
                    dispatch(action.addEmployee(json));
                    setCurrEmployee(dispatch, json.empId);
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
                if (response.ok)  return response.json();
                throw new Error("error");
            })
            .then(json => {
                dispatch(action.editEmployee(patchedEmployee));
                setCurrEmployee(dispatch, patchedEmployee.empId);
            })
            .catch(error => {
                alert('Error occured');
                console.log(error);
            });
    }
}

export const setCurrentEmployee = ({dispatch}) => (empId) => {
    setCurrEmployee(dispatch, empId);
}

export const updateGrades = (newGrades, empId, etag) => (dispatch) =>{
    const path = `${ENDPOINT_URL}/${empId}/grades`;
    setupRequest(path, etag, newGrades)
    .then(() => {
        /** update currentEmployee store after update grade to get new etag */
        setCurrEmployee(dispatch,empId);
    });
}



export const dispatchUpdateProjects = ({dispatch}) => (newProjects, employee) => {
        putProjects(newProjects, employee.empId, employee.etag)
            .then((response) => {
                if (response.ok) {
                 setCurrEmployee(dispatch, employee.empId);
                } else {
                  new Error("error");
                }
            })
            .catch((error) => {
                alert('Error occured');
                console.log(error);
            });
    }

export const dispatchUpdateLocations = ({dispatch}) => (newLocations, employee) => {
        putLocations(newLocations, employee.empId, employee.etag)
            .then((response) => {
                if (response.ok) {
                 setCurrEmployee(dispatch, employee.empId);
                } else {
                  new Error("error");
                }
            })
            .catch((error) => {
                alert('Error occured');
                console.log(error);
            });
    }

export const updateFamilyMembers = (newFamilyMembers, empId, etag) => (dispatch) =>{
    const path = `${ENDPOINT_URL}/${empId}/family`;
    setupRequest(path, etag, newFamilyMembers)
    .then(() => {
        /** update currentEmployee store after update family member to get new etag */
        setCurrEmployee(dispatch,empId);
    });
}

export const loadEmployees = (searchBy, params) => {
    if (searchBy === 'name') {
        //searchEmployeesByName(name, sortBy, pagingInfo)
        return searchEmployeesByName(params, Sort_By,  Paging_Info)
    } else {
        console.log('test');
        //return filterEmployees(this.filter.filters ? this.filter.filters : {}, this.sortBy, this.pagingInfo);
    }
}

export const refreshEmployeeList = (searchBy, params) => (dispatch) => {
    loadEmployees(searchBy, params)
        .then((response) => {
            if (response.ok) {
                return response.json();
            }
        })
        .then((json) => {
            dispatch(action.fetchEmployees(json._embedded.employees));
        })
}


