import { createParam } from './employeeHelpers';
import axios from 'axios';
import URI from "urijs";

export const empUrl = process.env.REACT_APP_API_URL ?
    process.env.REACT_APP_API_URL : 'https://rmsbackendspringstaging.herokuapp.com/employees'; //TODO: get from config samting

export const localUrl = "http://localhost:9090/oauth/token"

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

/*
var obj = {  
  method: 'POST',
  headers: {
    'Accept': 'application/json',
    'Content-Type': 'application/json',
    'Origin': 'http://localhost:3000',
    'Host': 'http://localhost:9092'
  },
  body: JSON.stringify({
    'client_id': '(API KEY)',
    'client_secret': '(API SECRET)',
    'grant_type': 'client_credentials'
  })*/



export const createTokenRequestUrl = () =>
    URI("/oauth/token")
        .query({
            grant_type: "password",
            client_id: "client4",
            client_secret: "secret",
            username: "doncorleone",
            password: "password"
        }).toString();



const request = url => {
    return new Promise((resolve, reject) => {
        const xmlHttp = new XMLHttpRequest();
        xmlHttp.timeout = 4000;
        xmlHttp.onreadystatechange = () => onReadyStateChange(xmlHttp, resolve, reject);
        xmlHttp.ontimeout = error => reject(error);
        xmlHttp.open("POST", localUrl, true);

        xmlHttp.setRequestHeader('Content-Type', 'application/x-www-form-urlencoded');
      //  xmlHttp.setRequestHeader('Access-Control-Allow-Origin', '*');
        xmlHttp.send();
    });
};

const onReadyStateChange = (xmlHttp, resolve, reject) => {
    if (xmlHttp.readyState === 4 && xmlHttp.status === 200) {
        resolve(createResultObject(xmlHttp));
    } else if (xmlHttp.status >= 400) {
        reject(createResultObject(xmlHttp));
    }
};

const createResultObject = xmlHttp => {
    const data = (xmlHttp.responseText.length > 0) ? JSON.parse(xmlHttp.responseText) : {};
    return ({
        status: xmlHttp.status,
        data
    });
};


export const requestToken = () =>
    request(() => {debugger; createTokenRequestUrl()});

/*export const requestToken = (credentials) => {
    var authOptions = {
        method: 'POST',
        url: 'http://localhost:9092/oauth/token',
        headers: {
            'Authorization': 'Basic Y2xpZW50NDpzZWNyZXQ=',
            'Content-Type': 'application/x-www-form-urlencoded'
        }
      }

  const postData = {
        data: {
            grant_type:"password", 
            username: "doncorleone", 
            password: "password",
            client_id: "client4"
        },
        encoded: "secret",
    };


    return axios
      .post('http://localhost:9092/oauth/token', postData.data, authOptions.headers)
      .then(response => {
        debugger
      })
      .catch(response => {
        debugger
      });
}*/



/*
export const requestToken = (credentials) => {
    debugger

    var myHeaders = new Headers();
    myHeaders.append("Authorization", "Basic " + btoa(credentials.data.client_id +':'+ credentials.encoded));
    myHeaders.append('Content-Type', 'application/x-www-form-urlencoded');

    var form_data = new FormData();

    form_data.append('grant_type', 'password');
    form_data.append('username', 'doncorleone');
    form_data.append('password', 'password');

    return fetch("http://localhost:9092/oauth/token", {
        method: "post",
        mode : "no-cors"
    });
}*/

/*fetch('URL_GOES_HERE', { 
   method: 'post', 
   headers: {
     'Authorization': 'Basic '+btoa('username:password'), 
     'Content-Type': 'application/x-www-form-urlencoded'
   }, 
   body: 'A=1&B=2'
 });*/

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