import React, { useState } from "react";
import * as sessionActions from "../../store/session";
import { useDispatch, useSelector } from "react-redux";
import { NavLink, Redirect } from 'react-router-dom';

function Notes() {
    // const dispatch = useDispatch();
    // const sessionUser = useSelector((state)=> state.session.user);

    return (
        <div className="notebook-page">
            <h2>My Notes:</h2>
            <ul>
                <li>
                    <button type="click">Edit</button>
                </li>
                <li>
                    <button type="click">Cancel</button>
                </li>
            </ul>
            {/* <button type="click" onClick={onClick}>Create New Notebook</button> */}
            <NavLink to='/notebook'>Create New Notebook</NavLink>
        </div>
    );
}

export default Notes;
