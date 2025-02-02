import axios from 'axios';
import { GET_ERRORS, SET_CURRENT_USER } from './types';
import setAuthToken from '../setAuthToken';
import jwt_decode from 'jwt-decode';

export const registerUser = (user, navigate) => dispatch => { //remove history here
    axios.post('/api/users/register', user)
        .then(res => navigate('/login')) // use the navigate function instead
        .catch(err => {
            let payload = {};
              if (err.response && err.response.data) {
                payload = err.response.data; // Get data from the response if it exists
              } else {
                 // The error is probably from the network so handle accordingly
                 payload = {general: "Network Error or unexpected server error, please check your connection"};
                 console.error("An error occurred: ",err);
               }
             dispatch({
                type: GET_ERRORS,
                payload: payload
             });
        });
}

export const loginUser = (user) => dispatch => {
    axios.post('/api/users/login', user)
        .then(res => {
            const { token } = res.data;
            localStorage.setItem('jwtToken', token);
            setAuthToken(token);
            const decoded = jwt_decode(token);
            dispatch(setCurrentUser(decoded));
        })
        .catch(err => {
           let payload = {};
           if (err.response && err.response.data) {
               payload = err.response.data;
           } else {
               payload = {general: "Network Error or unexpected server error, please check your connection"};
               console.error("An error occurred: ",err);
           }

          dispatch({
                type: GET_ERRORS,
                payload: payload
           });
        });
}

export const setCurrentUser = decoded => {
    return {
        type: SET_CURRENT_USER,
        payload: decoded
    }
}

export const logoutUser = (navigate) => dispatch => { // Changed to take navigate
    localStorage.removeItem('jwtToken');
    setAuthToken(false);
    dispatch(setCurrentUser({}));
    navigate('/login'); // Use navigate here instead of history.push
}