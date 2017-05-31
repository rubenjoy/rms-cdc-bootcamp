import * as action from './actions';
import 'whatwg-fetch';
import { requestToken } 
    from '../../utils/lib/employeeApiHelpers';


export const dispatchLogin = ({dispatch}) => {
    return (credential, callback) => {
        credential.client_id = "client4"
        credential.client_secret = "secret"
        requestToken(credential)
            .then(response => {
                if (response.ok) return response.json(); 
                throw new Error("error");
            })
            .then(json => {
                dispatch(action.login(json));
                sessionStorage.setItem('accessToken', JSON.stringify(json));
            })
            .then(() => {
                if (typeof callback === "function") callback()
            })
            .catch(error => {
                alert('Error occured');
                console.log(error)
            });
    }
}; 


export const dispatchLogout = ({dispatch}) => {
    return (callback) => {
        dispatch(action.logout());
        sessionStorage.removeItem('accessToken');
        if (typeof callback === "function") callback()

    } 
}; 
