import { createParam, urlencodeFormData } from './employeeHelpers';
import axios from 'axios';
import URI from "urijs";

export const empUrl = process.env.REACT_APP_API_URL ?
    process.env.REACT_APP_API_URL : 'http://localhost:9090/employees'; //TODO: get from config samting

export const localUrl = "http://localhost:9090/oauth/token"

export const addEmployee = (newEmployee) => {
    return fetch(empUrl, {
        method: "POST",
        headers: {
            "Accept": "application/json",
            "Content-type": "application/json",
            "Authorization": defaultAuthorization()
        },
        body: JSON.stringify(newEmployee)
    });
}

export const requestToken = (credentials) => {
    var authOptions = {
        method: 'POST',
        url: 'http://localhost:9090/oauth/token',
        headers: {
            'Authorization': 'Basic '+btoa(credentials.client_id+':'+credentials.client_secret),
            'Content-Type': 'application/x-www-form-urlencoded'
        }
      }
    var formData = new FormData();

    formData.append("grant_type", "password");
    formData.append("password", credentials.password);
    formData.append("username", credentials.username);


    return fetch('http://localhost:9090/oauth/token', {
        method: "POST",
        headers: authOptions.headers,
        body: urlencodeFormData(formData)
    });
}

export const getRoles = () => {

    return fetch("/roles", {
        mode: "GET",
        headers: defaultGetHeader()
    });
}

export const patchEmployee = (patchedEmployee, empId, etag) => {

    return fetch(`${empUrl}/${empId}`, {
        method: "PATCH",
        headers: {
            "Accept": "application/json",
            "Content-type": "application/json",
            'If-Match': etag,
            "Authorization": defaultAuthorization()
        },
        body: JSON.stringify(patchedEmployee)
    });
}

export const filterEmployees = (filter, sortBy, pagingInfo) => {
    return fetch(`${empUrl}/filter${createParam(pagingInfo, sortBy)}`, {
        method: "POST",
        headers: {
            "Accept": "application/json",
            "Content-type": "application/json",
            "Authorization": defaultAuthorization()
        },
        body: JSON.stringify(filter)
    });
}

export const getEmployee = (empId) => {

    return fetch(`${empUrl}/${empId}`, {
        mode: "GET",
        headers: defaultGetHeader()
    });
}

export const searchEmployeesByName = (name, sortBy, pagingInfo) => {

    return fetch(`${empUrl}/search/findByName${createParam(pagingInfo, sortBy)}&name=${name}`);
}

export const deleteEmployee = (empId) => {
    return fetch(`${empUrl}/${empId}`, {
        method: "DELETE",
        headers: {
            "Accept": "application/json",
            "Content-type": "application/json",
            "Authorization": defaultAuthorization()
        }
    })
}

export const putRequest = (path, etag, body) => {

    return fetch(path, {
        method: "PUT",
        headers: {
            "Accept": "application/json",
            "Content-type": "application/json",
            'If-Match': etag,
            "Authorization": defaultAuthorization()
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
            'If-Match': etag,
            "Authorization": defaultAuthorization()
        },
        body: JSON.stringify(body)
    });
}



export const defaultGetHeader = () => {
    const authorization = sessionStorage 
        && sessionStorage.accessToken ? JSON.parse(sessionStorage.accessToken) : null;

        if (authorization) {
            return {
                Authorization: `Bearer ${authorization.access_token}`
            }
        } else {
            return {}
        }
}



export const defaultAuthorization = () => {
    const authorization = sessionStorage 
        && sessionStorage.accessToken ? JSON.parse(sessionStorage.accessToken) : null;

        if (authorization) {
            return `Bearer ${authorization.access_token}`
        } else {
            return null
        }
}