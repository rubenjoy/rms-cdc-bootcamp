import * as action from './actions';
import 'whatwg-fetch';
import { patchEmployee, getEmployee, addEmployee, deleteEmployee, 
    setupRequest, putProjects, putLocations, defaultGetHeader, searchEmployeesByName, filterEmployees } 
    from '../../utils/lib/employeeApiHelpers';

const ENDPOINT_URL = 'http://localhost:9090/employees';
const Paging_Info = {size: 10};
const Sort_By = [ { sortBy: "firstName", sortType: "asc" } ];

export const dispatchFetchEmployees = ({dispatch}) => {
    return () => {

        fetch(ENDPOINT_URL, {
            method: "GET",
            headers: defaultGetHeader()
        })
        .then(response => {
            if (response.ok) return response.json()
            throw new Error('error')
        })
        .then(json => {
            dispatch(action.fetchEmployees(json._embedded.employees));
        })
        .catch(error => {
            alert('Error occured');
            console.log(error)
        });
    }
}; 

const setCurrEmployee = (dispatch, empId, callback) => {
    let fetchedEmployee = {}
    getEmployee(empId, callback)
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
        })
        .then(() => {
            if (typeof callback === "function") callback()
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

export const setCurrentEmployee = ({dispatch}) => (empId, callback) => {
    setCurrEmployee(dispatch, empId, callback);
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

export const loadEmployees = (searchBy, params, sortBy) => {
    if (searchBy === 'name') {
        return searchEmployeesByName(params, sortBy,  Paging_Info)
    } else {
        return filterEmployees(params, sortBy, Paging_Info)
    }
}

export const refreshEmployeeList = (searchBy, params, sortBy) => (dispatch) => {
    const sortedBy = sortBy ? sortBy : Sort_By
    loadEmployees(searchBy, params, sortedBy)
        .then((response) => {
            if (response.ok) {
                return response.json();
            }
        })
        .then((json) => {
            dispatch(action.fetchEmployees(json._embedded ? json._embedded.employees : []));
        })
}

export const getOffices = ({dispatch}) => {
    const URL = 'https://rmsbackendspringstaging.herokuapp.com/offices';
    return () => {
        fetch(URL)
            .then(response => response.json())
            .then(json => {
                dispatch(action.getOffices(json._embedded.offices));
            })
            .catch(error => {
                alert('Error occured');
                console.log(error)
            });
    }
}

export const getJobFamilies = ({dispatch}) => {
    const URL = 'https://rmsbackendspringstaging.herokuapp.com/jobFamilies'
    return () => {
        fetch(URL)
            .then(response => response.json())
            .then(json => {
                dispatch(action.getJobFamily(json._embedded.jobFamilies));
            })
            .catch(error => {
                alert('Error occured');
                console.log(error)
            });
    }
}


