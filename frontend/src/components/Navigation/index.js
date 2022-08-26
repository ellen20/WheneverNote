import React from 'react';
import { NavLink } from 'react-router-dom';
import { useSelector } from 'react-redux';
import ProfileButton from './ProfileButton';
import LoginFormModal from '../LoginFormModal';
import SignupFormModal from '../SignupFormModal';
import './Navigation.css';
import logo from './logo.png';

function Navigation({ isLoaded }) {
    const sessionUser = useSelector(state => state.session.user);
    let sessionLinks;

    if (sessionUser) {
        sessionLinks = (
            <>
                <NavLink to='/notebooks' style={{ textDecoration: 'none', padding: '1rem' }}>
                    <i class="fa-solid fa-book"></i> Notebooks
                </NavLink>
                <NavLink to='/notes' style={{ textDecoration: 'none', padding: '1rem' }}>
                    <i class="fa-solid fa-note-sticky"></i> Notes
                </NavLink>
                <ProfileButton user={sessionUser} />
            </>
        );
    } else {
        sessionLinks = (
            <>
                <div className='login-signup'>
                    <LoginFormModal /> | <SignupFormModal />
                </div>
            </>
        );
    }

    return (
        <div className='nav'>
            <div className="nav-links">
                    <span>
                        <img className='logo' src={logo} />
                    </span>
                   <NavLink className='logo-name'
                    exact to="/" style={{ textDecoration: 'none' }}
                    >
                        Whenevernote
                    </NavLink>
            </div>
            <div className='session-links'>
                {isLoaded && sessionLinks}
            </div>
        </div>
    );
}

export default Navigation;
