import { GET_ERRORS } from '../actions/types';

const initialState = {};

export default function(state = initialState, action ) {
    switch(action.type) {
        case GET_ERRORS:
            return  action.payload ? action.payload: {}; //Make sure we never return null or undefined
        default:
            return state;
    }
}