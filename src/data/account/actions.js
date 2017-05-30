import * as actionTypes from './actionTypes';

export const login = (account) => {
    return {
        type: actionTypes.LOGIN,
        payload: account
    };
};