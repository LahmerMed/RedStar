import React, { Component } from 'react';
import { Route, Routes } from 'react-router-dom'; // Import Routes
import { Provider } from 'react-redux';
import store from './store';
import jwt_decode from 'jwt-decode';
import setAuthToken from './setAuthToken';
import { setCurrentUser, logoutUser } from './actions/authentication';

import Navbar from './components/Navbar';
import Register from './components/Register';
import Login from './components/Login';
import Home from './components/Home';

import 'bootstrap/dist/css/bootstrap.min.css';

if (localStorage.jwtToken) {
    setAuthToken(localStorage.jwtToken);
    const decoded = jwt_decode(localStorage.jwtToken);
    store.dispatch(setCurrentUser(decoded));

    const currentTime = Date.now() / 1000;
    if (decoded.exp < currentTime) {
        store.dispatch(logoutUser());
        window.location.href = '/login';
    }
}

class App extends Component {
    render() {
        return (
                <div>
                    <Navbar />
                    <Routes> {/* Wrap your Routes here */}
                      <Route exact path="/" element={<Home />} />
                         <Route exact path="/register" element={<Register />} />
                         <Route exact path="/login" element={<Login />} />
                    </Routes>
                </div>
        );
    }
}

export default App;