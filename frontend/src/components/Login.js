import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import { connect, useDispatch, useSelector } from 'react-redux'; // Use useDispatch and useSelector
import { loginUser } from '../actions/authentication';
import './Login.css';
import logo from './logo_redboost.png';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faEnvelope, faLock } from '@fortawesome/free-solid-svg-icons';
import { useNavigate } from 'react-router-dom'; // Import useNavigate

const Login = (props) => {  // Now a functional component
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const dispatch = useDispatch(); // Get dispatch
    const navigate = useNavigate(); // Get the navigate function
    const auth = useSelector(state => state.auth);  // Get auth from redux
    const errors = useSelector(state => state.errors)  // Get errors from redux


    useEffect(() => { // Similar to componentDidMount and componentWillReceiveProps
        if (auth.isAuthenticated) {
          navigate('/');
        }

    }, [auth.isAuthenticated, navigate]);

    const handleInputChange = (e) => {
        if (e && e.target) {
          const { name, value } = e.target;
          if (name === 'email') {
             setEmail(value)
          }else if(name === 'password') {
             setPassword(value)
          }
        }
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        const user = {
            email: email,
            password: password,
        };
       dispatch(loginUser(user, navigate));
    };


        return (
            <div className="login-container">
                <div className="login-form-wrapper">
                   <div className="login-left">
                    <div className="logo-container">
                        <img src={logo} alt="Logo" />
                        </div>
                    <p className="tagline-text">
                        RedStart Tunisie : Pour un entrepreneuriat durable. Accompagnement, financement et formation pour des projets à impact environnemental.
                    </p>
                    </div>
                    <div className="login-right">
                        <h2>Log In</h2>
                        <p>Enter your credentials to access your account</p>
                        <form onSubmit={handleSubmit}>
                            <div className="mb-3">
                                <div className="input-container">
                                    <FontAwesomeIcon icon={faEnvelope} className="input-icon" />
                                    <input
                                        type="email"
                                        placeholder="Email"
                                        className={`form-control form-control-lg custom-input ${
                                            errors && errors.email ? 'is-invalid' : ''
                                        }`}
                                        name="email"
                                        onChange={handleInputChange}
                                        value={email}
                                    />
                                    {errors && errors.email && (
                                        <div className="invalid-feedback">{errors.email}</div>
                                    )}
                                </div>
                            </div>
                            <div className="mb-3">
                                <div className="input-container">
                                    <FontAwesomeIcon icon={faLock} className="input-icon" />
                                    <input
                                        type="password"
                                        placeholder="Password"
                                        className={`form-control form-control-lg custom-input ${
                                            errors && errors.password ? 'is-invalid' : ''
                                        }`}
                                        name="password"
                                        onChange={handleInputChange}
                                        value={password}
                                    />
                                    {errors && errors.password && (
                                        <div className="invalid-feedback">{errors.password}</div>
                                    )}
                                </div>
                            </div>
                            <div className="d-grid gap-2 mb-2">
                                <button type="submit" className="btn btn-success btn-lg custom-button">
                                    Log In
                                </button>
                            </div>
                            <div
                                style={{
                                    textAlign: 'center',
                                    marginTop: '20px',
                                    color: '#777',
                                    fontSize: '0.9rem',
                                }}
                            >
                                Don't have an account?{' '}
                                <a href="/register" className="custom-link">
                                    Register
                                </a>
                            </div>
                        </form>
                    </div>
                </div>
            </div>
        );
    }

Login.propTypes = {
    loginUser: PropTypes.func.isRequired,
    auth: PropTypes.object.isRequired,
    //errors: PropTypes.object.isRequired, //removed this because we get errors from useSelector
};

const mapStateToProps = (state) => ({
    auth: state.auth,
    //errors: state.errors, //removed this as we get errors from useSelector
});

export default connect(mapStateToProps, { loginUser })(Login);