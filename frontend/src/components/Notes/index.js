import React, { useState, useEffect } from "react";
import * as noteActions from "../../store/note";
import { useDispatch, useSelector } from "react-redux";
import { NavLink, Redirect } from 'react-router-dom';
import './Notes.css';

function Notes() {
    const dispatch = useDispatch();
    const sessionUser = useSelector((state)=> state.session.user);
    let allNotes = useSelector((state) => state.note);
    allNotes = Object.values(allNotes);

    useEffect(() => {
        dispatch(noteActions.getNotes())
    }, [dispatch]);

    const notes = allNotes.filter(note => note.userId === sessionUser?.id);
    notes.sort((a, b) => b.id - a.id);

    const onDelete = (e) => {
        let id = e.currentTarget.value;
        dispatch(noteActions.deleteNote(id));
    };

    return (
        <div className="notes-page">
                <h2>All Notes:</h2>
                <NavLink to='/notebook/new'>
                    <i class="fa-solid fa-plus"></i>
                    <i class="fa-solid fa-book"></i>
                </NavLink>
            <ul>
                {notes.map((note, idx) => (
                    <li key={idx}>
                        <div clasName="note-list">
                            Notebook: {note.Notebook?.title}      Note: {note?.title}
                            <div className="note-content">
                            {note?.content}
                            <NavLink to={`/${note?.id}/${note.Notebook?.id}`}>
                                <i class="fa-solid fa-pen-to-square"></i>
                            </NavLink>
                            <button type="click" value={note.id} onClick={onDelete}>
                                <i class="fa-solid fa-trash-can"></i>
                            </button>
                                {/* <NavLink to={`/delete/${note?.id}`}>
                                    <i class="fa-solid fa-trash-can"></i>
                                </NavLink> */}
                            </div>
                        </div>
                    </li>
                ))}
            </ul>
        </div>
    );
}

export default Notes;
