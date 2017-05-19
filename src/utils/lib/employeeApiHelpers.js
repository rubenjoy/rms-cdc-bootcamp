import { createParam } from './employeeHelpers';

export const empUrl = process.env.REACT_APP_API_URL ?
    process.env.REACT_APP_API_URL : 'https://rmsbackendspringstaging.herokuapp.com/employees'; //TODO: get from config samting

export const addEmployee = (newEmployee) => {
    return fetch(empUrl, {
        method: "POST",
        headers: {
            "Accept": "application/json",
            "Content-type": "application/json"
        },
        body: JSON.stringify(newEmployee)
    });
}

export const patchEmployee = (patchedEmployee, empId, etag) => {

    return fetch(`${empUrl}/${empId}`, {
        method: "PATCH",
        headers: {
            "Accept": "application/json",
            "Content-type": "application/json",
            'If-Match': etag
        },
        body: JSON.stringify(patchedEmployee)
    });
}

export const filterEmployees = (filter, sortBy, pagingInfo) => {
    return fetch(`${empUrl}/filter${createParam(pagingInfo, sortBy)}`, {
        method: "POST",
        headers: {
            "Accept": "application/json",
            "Content-type": "application/json"
        },
        body: JSON.stringify(filter)
    });
}

export const getEmployee = (empId) => {

    return fetch(`${empUrl}/${empId}`);
}

export const searchEmployeesByName = (name, sortBy, pagingInfo) => {

    return fetch(`${empUrl}/search/findByName${createParam(pagingInfo, sortBy)}&name=${name}`);
}

export const deleteEmployee = (empId) => {
    return fetch(`${empUrl}/${empId}`, {
        method: "DELETE",
        headers: {
            "Accept": "application/json",
            "Content-type": "application/json"
        }
    })
}

export const putRequest = (path, etag, body) => {

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

export const putGrades = (newGrades, empId, etag) => {

    return putRequest(`${empUrl}/${empId}/grades`, etag, newGrades);
}

export const putProjects = (newProjects, empId, etag) => {

    return putRequest(`${empUrl}/${empId}/projects`, etag, newProjects);
}

export const putFamily = (newFamily, empId, etag) => {

    return putRequest(`${empUrl}/${empId}/family`, etag, newFamily);
}

export const putLocations = (newLocations, empId, etag) => {

    return putRequest(`${empUrl}/${empId}/locations`, etag, newLocations);
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