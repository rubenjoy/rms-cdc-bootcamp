import * as actionTypes from './actionTypes';

const initialState = {
    accessToken: sessionStorage.getItem('accessToken') ? sessionStorage.getItem('accessToken') : null
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
        case actionTypes.LOGOUT:{
            return {
                ...state,
                accessToken: null
            };
        }
        default: {
            return state;
        }
    }
};