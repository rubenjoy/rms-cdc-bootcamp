const initialState = {
    accessToken: localStorage.accessToken ? localStorage.accessToken : null
};

// Process the data based on action taken (immutable)
export const reducer = (state = initialState, action) => {
    switch(action.type) {
        default: {
            return state;
        }
    }
};