import * as actionTypes from './actionTypes';

export const login = (message) => {
    return {
        type: actionTypes.SHOW_ERROR,
        payload: message
    };
};