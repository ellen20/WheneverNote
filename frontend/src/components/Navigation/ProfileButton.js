import React, { useState, useEffect } from "react";
import { useDispatch } from 'react-redux';
import * as sessionActions from '../../store/session';
import {useHistory} from 'react-router-dom';
import "./Navigation.css";

function ProfileButton({ user }) {
    const dispatch = useDispatch();
    const [showMenu, setShowMenu] = useState(false);
    const history = useHistory();

    const openMenu = () => {
        if (showMenu) return;
        setShowMenu(true);
    };

    useEffect(() => {
        if (!showMenu) return;

        const closeMenu = () => {
            setShowMenu(false);
        };

        document.addEventListener('click', closeMenu);

        return () => document.removeEventListener("click", closeMenu);
    }, [showMenu]);

    const logout = (e) => {
        e.preventDefault();
        dispatch(sessionActions.logout());
        history.replace('/');
    };

    return (
        <>
            <button onClick={openMenu}>
                <i class="fa-solid fa-user"></i>
            </button>
            {showMenu && (
                <div className="username-logout">
                    |  {user.username}   |
                    <button onClick={logout}>Log Out</button>
                </div>
            )}
        </>
    );
}

export default ProfileButton;
