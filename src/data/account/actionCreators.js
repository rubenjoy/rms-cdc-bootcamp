import * as action from './actions';
import 'whatwg-fetch';
import { requestToken } 
    from '../../utils/lib/employeeApiHelpers';

const ENDPOINT_URL = 'https://localhost:9091/oauth/token';


export const postData = {
    data: {
        grant_type:"password", 
        username: "doncorleone", 
        password: "password",
        client_id: "client4"
    },
    encoded: "secret",
};



export const dispatchLogin = ({dispatch}) => {
    return (credential) => {
        debugger
        requestToken(postData)
            .then((response) => {debugger})
            .then(json => {
                debugger
            })
            .catch(error => {
                debugger
                alert('Error occured');
                console.log(error)
            });
    }
}; 
