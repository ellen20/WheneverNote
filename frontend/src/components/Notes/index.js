import React, { useState } from "react";
import * as sessionActions from "../../store/session";
import { useDispatch, useSelector } from "react-redux";
import { NavLink, Redirect } from 'react-router-dom';
import './Notes.css';

function Notes() {
    // const dispatch = useDispatch();
    const sessionUser = useSelector((state)=> state.session.user);
    // const notebooks =
    return (
        <div className="notes-page">
            <h2>{sessionUser?.username}'s Notes:</h2>
            <ul>

                <li>
                    <button type="click">Edit</button>
                </li>
                <li>
                    <button type="click">Delete</button>
                </li>
            </ul>
            {/* <button type="click" onClick={onClick}>Create New Notebook</button> */}
            <NavLink to='/notebook/new'>Create New Notebook</NavLink>
        </div>
    );
}

export default Notes;
