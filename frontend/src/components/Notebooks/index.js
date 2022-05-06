import React, { useState, useEffect } from "react";
import * as notebookActions from "../../store/notebook";
import * as noteActions from "../../store/note";
import { useDispatch, useSelector } from "react-redux";
import "./Notebooks.css";
import {NavLink, useHistory} from 'react-router-dom';
import Note from '../Note';

function Notebooks() {
    const dispatch = useDispatch();
    const [errors, setErrors] = useState([]);
    const history = useHistory();
    const sessionUser = useSelector((state) => state.session.user);
    let allNotebooks = useSelector((state) => state.notebook);
    allNotebooks = Object.values(allNotebooks);//obj to array
    allNotebooks.sort((a, b) => b.id - a.id);//sort by notebook.id

    useEffect(() =>{
        dispatch(notebookActions.getNotebooks())
    },[]);

    const notebooks = allNotebooks.filter(note => note.userId === sessionUser?.id)

    const onDelete = (e) => {
        let id = e.currentTarget.value;
        dispatch(notebookActions.deleteNotebook(id));
    }

    return (
        <div className="notebooks-page">
            <h2>All Notebooks:</h2>
            <NavLink to='/notebook/new' >
                <i class="fa-solid fa-plus"></i>
                <i class="fa-solid fa-book"></i>
            </NavLink>
            <ul>
                {errors.map((error, idx) => (
                    <li key={idx}>{error} </li>
                ))}
            </ul>
            <ol>
                 {notebooks.map((notebook, idx) => (
                    <li key={idx}>
                        {notebook?.title}
                    <button type="button" value={notebook.id} onClick={(e)=>onDelete(e)}>
                        <i class="fa-solid fa-trash-can"></i>
                    </button>
                    <NavLink to={`/note/${notebook.id}`} >
                        <i class="fa-solid fa-plus"></i>
                        <i class="fa-solid fa-note-sticky"></i>
                    </NavLink>
            </li>))}
            </ol>
            <NavLink to='/'>Cancel</NavLink>
        </div>
    );
}

export default Notebooks;
