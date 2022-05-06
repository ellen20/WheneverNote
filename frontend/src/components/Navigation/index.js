import React from 'react';
import { NavLink } from 'react-router-dom';
import { useSelector } from 'react-redux';
import ProfileButton from './ProfileButton';
import LoginFormModal from '../LoginFormModal';
import SignupFormModal from '../SignupFormModal';//
import './Navigation.css';

function Navigation({ isLoaded }) {
    const sessionUser = useSelector(state => state.session.user);

    let sessionLinks;


    if (sessionUser) {
        sessionLinks = (
            <>
                <NavLink to='/notebooks' style={{ textDecoration: 'none' }}>
                    <i class="fa-solid fa-book"></i>
                </NavLink>
                <NavLink to='/notes' style={{ textDecoration: 'none' }}>
                    <i class="fa-solid fa-note-sticky"></i>
                </NavLink>
                <ProfileButton user={sessionUser} />
            </>
        );
    } else {
        sessionLinks = (
            <>
                <div className='login-signup'>
                    <LoginFormModal />
                    <SignupFormModal />
                </div>
            </>
        );
    }

    return (
        <ul className='nav'>
            <li>
                <div className="nav-links">
                   <NavLink exact to="/" style={{ textDecoration: 'none' }}>Whenevernote</NavLink>
                </div>
                {isLoaded && sessionLinks}
            </li>
        </ul>
    );
}

export default Navigation;
