import * as action from './actions';
import 'whatwg-fetch';

const ENDPOINT_URL = 'https://rmsbackendspringstaging.herokuapp.com/employees';

export const dispatchFetchEmployees = () => {
    fetch(ENDPOINT_URL)
        .then(response => response.json())
        .then(json => {
            action.fetchEmployees(json);
        })
        .catch(error => {
            console.log(error);
            alert('Error occured');
        });
};