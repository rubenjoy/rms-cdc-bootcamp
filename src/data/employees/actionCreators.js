import * as action from './actions';
import 'whatwg-fetch';

const ENDPOINT_URL = 'https://rmsbackendspringstaging.herokuapp.com/employees';
/** Should be put in global component */
export const getEmployee = (empId) => {
    return fetch(`${ENDPOINT_URL}/${empId}`)
}

export const setupRequest = (path, etag, body) => {
    return fetch(path, {
        method: "PUT",
        headers: {
            "Accept": "application/json",
            "Content-type": "application/json",
            'If-Match': etag
        },
        body: JSON.stringify(body)
    });
}
/** Should be put in global component */

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

export const setCurrentEmployee = (empId) => (dispatch) => {
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
        })
}

export const updateGrades = (newGrades, empId, etag) => (dispatch) =>{
    const path = `${ENDPOINT_URL}/${empId}/grades`;
    setupRequest(path, etag, newGrades)
    .then(() => {
        /** update currentEmployee store after update grade to get new etag */
        dispatch(setCurrentEmployee(empId));
    });
}