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
    notes.sort((a, b) => b.id - a.id);
    console.log("!!!!!!!!!", notes)

    const onDelete = (e) => {
        let id = e.target.value;
        console.log(">>>>>",id)
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
                            DELETE
                        </button>
                    </li>
                ))}
            </ul>
            {/* <ul>
                {notes.map((note, idx) => (
                    <li key={idx}>
                        <div className="note-list">
                            <div className="title">
                                {note.Notebook?.title}: {note?.title}
                            </div>
                            <div className="note-content">
                                {note?.content}
                                <NavLink to={`/${note?.id}/${note.Notebook?.id}`}>
                                    <i class="fas fa-edit"></i>
                                </NavLink>
                            <button type="click" name='delete' value={note?.id} onClick={(e)=>onDelete(e)}>
                                Delete
                            </button>
                            </div>
                        </div>
                    </li>
                ))}
            </ul> */}
        </div>
    );
}

export default Notes;
