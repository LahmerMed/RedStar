import React, { useState, useEffect } from 'react';
import { connect, useDispatch, useSelector } from 'react-redux'; // Use useDispatch
import PropTypes from 'prop-types';
import { useNavigate } from 'react-router-dom'; // Import useNavigate
import { registerUser } from '../actions/authentication';
import 'react-phone-number-input/style.css';
import PhoneInput from 'react-phone-number-input';
import './Register.css';
import logo from './logo_redboost.png';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faUser, faEnvelope, faLock, faPhone } from '@fortawesome/free-solid-svg-icons';


const Register = (props) => {  // Now a functional component
    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [password_confirm, setPasswordConfirm] = useState('');
    const [phoneNumber, setPhoneNumber] = useState('');
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const auth = useSelector(state => state.auth)
    const errors = useSelector(state => state.errors);

    useEffect(() => { // Similar to componentDidMount and componentWillReceiveProps
      if (auth.isAuthenticated) {
            navigate('/');
        }
    }, [auth.isAuthenticated, navigate]);

    const handleInputChange = (e) => {
        if (e && e.target) {
            const { name, value } = e.target;
            if(name === 'name'){
                setName(value)
            } else if(name === 'email'){
                setEmail(value)
            } else if (name === 'password') {
                setPassword(value)
            } else if (name === 'password_confirm'){
              setPasswordConfirm(value)
            }
        }
    };

    const handlePhoneNumberChange = (value) => {
      setPhoneNumber(value)
    }

    const handleSubmit = (e) => {
        e.preventDefault();
        const user = {
            name,
            email,
            password,
            password_confirm,
            phoneNumber,
        };
        dispatch(registerUser(user, navigate)); // pass navigate instead of history
    };
        return (
            <div className="register-container">
                <div className="register-form-wrapper">
                    <div className="register-left">
                       <div style={{ textAlign: 'center', marginBottom: '10px', width:'100%' }}>
                          <h1 style={{ color: '#495057', fontSize: '2.2rem',  fontWeight: 'bold'}}>Sign up in Redboost</h1>
                        </div>
                        <div className="logo-container">
                            <img src={logo} alt="Logo" />
                        </div>
                        <p className="tagline-text">
                          RedStart Tunisie : Pour un entrepreneuriat durable. Accompagnement, financement et formation pour des projets à impact environnemental.
                        </p>
                    </div>
                    <div className="register-right">
                        <h2>Sign up</h2>
                        <p> Create a new account!</p>
                        <form onSubmit={handleSubmit}>
                            <div className="mb-3">
                                <div className="input-container">
                                    <FontAwesomeIcon icon={faUser} className="input-icon" />
                                    <input
                                        type="text"
                                        placeholder="Name"
                                        className={`form-control form-control-lg custom-input ${
                                            errors && errors.name ? 'is-invalid' : ''
                                        }`}
                                        name="name"
                                        onChange={handleInputChange}
                                        value={name}
                                    />
                                    {errors && errors.name && (
                                        <div className="invalid-feedback">{errors.name}</div>
                                    )}
                                </div>
                            </div>
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
                                    <FontAwesomeIcon icon={faPhone} className="input-icon" />
                                    <PhoneInput
                                        placeholder="Phone Number"
                                        className={`form-control form-control-lg custom-input ${
                                            errors && errors.phoneNumber ? 'is-invalid' : ''
                                        }`}
                                        value={phoneNumber}
                                        onChange={handlePhoneNumberChange}
                                    />
                                    {errors && errors.phoneNumber && (
                                        <div className="invalid-feedback">{errors.phoneNumber}</div>
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
                            <div className="mb-3">
                                <div className="input-container">
                                    <FontAwesomeIcon icon={faLock} className="input-icon" />
                                    <input
                                        type="password"
                                        placeholder="Confirm Password"
                                        className={`form-control form-control-lg custom-input ${
                                           errors && errors.password_confirm ? 'is-invalid' : ''
                                        }`}
                                        name="password_confirm"
                                        onChange={handleInputChange}
                                        value={password_confirm}
                                    />
                                    {errors && errors.password_confirm && (
                                        <div className="invalid-feedback">
                                            {errors.password_confirm}
                                        </div>
                                    )}
                                </div>
                            </div>
                            <div className="d-grid gap-2 mb-2">
                                <button
                                    type="submit"
                                    className="btn btn-success btn-lg custom-button"
                                >
                                    Register
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
                                Already have an account?{' '}
                                <a href="/login" className="custom-link">
                                    Log in
                                </a>
                            </div>
                        </form>
                    </div>
                </div>
            </div>
        );
    }


Register.propTypes = {
    registerUser: PropTypes.func.isRequired,
    auth: PropTypes.object.isRequired,
     //errors: PropTypes.object.isRequired, //removed this because we get errors from useSelector
};

const mapStateToProps = (state) => ({
    auth: state.auth,
   // errors: state.errors,  //removed this because we get errors from useSelector
});

export default connect(mapStateToProps, { registerUser })(Register);