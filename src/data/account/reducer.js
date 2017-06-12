import * as actionTypes from './actionTypes';

const initialState = {
    accessToken: sessionStorage.getItem('accessToken') ? JSON.parse(sessionStorage.getItem('accessToken')) : null,
    roles: sessionStorage.getItem('roles') ? JSON.parse(sessionStorage.getItem('roles')) : null
};

// Process the data based on action taken (immutable)
export const reducer = (state = initialState, action) => {
    switch(action.type) {
        case actionTypes.LOGIN:{
            return {
                ...state,
                accessToken: action.payload
            };
        }
        case actionTypes.GET_ROLES:{
            return {
                ...state,
                roles: action.payload
            };
        }  case actionTypes.LOGOUT:{
            return {
                ...state,
                roles: null,
                accessToken: null
            };
        }
        default: {
            return state;
        }
    }
};