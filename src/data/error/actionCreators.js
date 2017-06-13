import * as action from './actions';

export const dispatchRouter = ({dispatch}) => {
    return (message) => {
        dispatch(action.showError(message));
    }
}; 