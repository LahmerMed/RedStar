import React from 'react';
import { Link, useNavigate } from 'react-router-dom'; // Import useNavigate
import PropTypes from 'prop-types';
import { connect, useDispatch, useSelector } from 'react-redux'; // Import useDispatch
import { logoutUser } from '../actions/authentication';
import logo from '../components/logo_redboost.png'; // Import your logo image

const Navbar = (props) => { // Now a functional component
    const navigate = useNavigate(); // Get navigate
    const dispatch = useDispatch()
    const auth = useSelector(state => state.auth)


    const onLogout = (e) => {
        e.preventDefault();
        dispatch(logoutUser(navigate)); // Use navigate
    };

        const authLinks = (
            <ul className="navbar-nav ml-auto">
                <a href="" className="nav-link" onClick={onLogout}>
                    <img
                        src={auth.user.avatar}
                        alt={auth.user.name}
                        title={auth.user.name}
                        className="rounded-circle"
                        style={{ width: '25px', marginRight: '5px' }}
                    />
                    Logout
                </a>
            </ul>
        );
        const guestLinks = (
            <ul className="navbar-nav ml-auto">
                <li className="nav-item">
                    <Link className="nav-link" to="/register">
                        Sign Up
                    </Link>
                </li>
                <li className="nav-item">
                    <Link className="nav-link" to="/login">
                        Sign In
                    </Link>
                </li>
            </ul>
        );
        return (
            <nav className="navbar navbar-expand-lg navbar-light bg-light">
                <Link className="navbar-brand" to="/">
                    <img src={logo} alt="Logo" className="navbar-logo" style={{ maxHeight: '40px' }} />
                </Link>
                <div className="collapse navbar-collapse" id="navbarSupportedContent">
                    {auth.isAuthenticated ? authLinks : guestLinks}
                </div>
            </nav>
        );
    }


Navbar.propTypes = {
    logoutUser: PropTypes.func.isRequired,
    auth: PropTypes.object.isRequired,
};

const mapStateToProps = (state) => ({
    auth: state.auth,
});

export default connect(mapStateToProps, { logoutUser })(Navbar); // Removed withRouter