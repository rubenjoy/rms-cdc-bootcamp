import { push } from 'react-router-redux';

export const dispatchRouter = ({dispatch}) => {
    return (location) => {
                dispatch(push(location));
    }
}; 