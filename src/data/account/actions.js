import * as actionTypes from './actionTypes';

export const login = (account) => {
    return {
        type: actionTypes.LOGIN,
        payload: account
    };
};

export const getRoles = (account) => {
    return {
        type: actionTypes.GET_ROLES,
        payload: account
    };
};

export const logout = () => {
    return {
        type: actionTypes.LOGOUT
    };
};