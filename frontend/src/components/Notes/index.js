import React, { useState, useEffect } from "react";
import * as noteActions from "../../store/note";
import { useDispatch, useSelector } from "react-redux";
import { NavLink, Redirect } from 'react-router-dom';
import './Notes.css';

function Notes() {
    const dispatch = useDispatch();
    const sessionUser = useSelector((state)=> state.session.user);

    useEffect(() => {
        dispatch(noteActions.getNotes())
    }, []);

    let notes = useSelector((state) => state.note);
    notes = Object.values(notes);
    // console.log(">>>>>>>>", notes);
    const onDelete = (e) => {
        let id = e.target.value;
        // console.log(">>>>>>>>>", e.target.value)
        dispatch(noteActions.deleteNote(id));
    };

    return (
        <div className="notes-page">
            <h2>All Notes:</h2>
            <NavLink to='/notebook/new'>Create New Notebook</NavLink>

            <ul>
                {notes.map((note, idx) => (
                    <li key={idx}>
                        <span>notebook: {note.Notebook?.title}</span>
                        <span>note: {note?.title}</span>
                        <span>content: {note?.content}</span>
                        <NavLink to={`/${note?.id}/${note.Notebook?.id}`}>Edit</NavLink>
                        {/* <button type="click" value={note.id} onClick={onEdit}>Edit</button> */}
                        <button type="click" value={note.id} onClick={onDelete}>Delete</button>
                    </li>
                ))}
            </ul>
            {/* <button type="click" onClick={onClick}>Create New Notebook</button> */}

        </div>
    );
}

export default Notes;
