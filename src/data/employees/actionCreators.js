import * as action from './actions';
import 'whatwg-fetch';

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