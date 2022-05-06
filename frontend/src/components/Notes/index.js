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
                        <span>{note.Notebook?.title}</span>
                        <span>{note?.title}</span>
                        <span>content: {note?.content}</span>
                        <NavLink to={`/${note?.id}/${note.Notebook?.id}`}>
                            <i class="fa-solid fa-pen-to-square"></i>
                        </NavLink>
                        <button type="click" value={note.id} onClick={onDelete}>
                            {/* DELETE */}
                            <i class="fa-solid fa-trash-can"></i>
                        </button>
                    </li>
                ))}
            </ul>
        </div>
    );
}

export default Notes;
