const initialState = {
    errorMessage: null
};

// Process the data based on action taken (immutable)
export const reducer = (state = initialState, action) => {
    switch(action.type) {
        case actionTypes.SHOW_ERROR:{
            return {
                ...state,
                errorMessage: action.payload
            };
        }
        default: {
            return state;
        }
    }
};