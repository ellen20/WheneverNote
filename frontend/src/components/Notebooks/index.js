import React, { useState, useEffect } from "react";
import * as notebookActions from "../../store/notebook";
import { useDispatch, useSelector } from "react-redux";
import "./Notebooks.css";
import {NavLink, useHistory} from 'react-router-dom';
import Note from '../Note';

function Notebooks() {
    const dispatch = useDispatch();
    const [errors, setErrors] = useState([]);
    const history = useHistory();

    let notebooks = useSelector((state) => state.notebook);
    notebooks = Object.values(notebooks);//obj to array
    notebooks.sort((a, b) => b.id - a.id);//sort by notebook.id

    useEffect(() =>{
        dispatch(notebookActions.getNotebooks())
    },[]);

    const onDelete = (e) => {
        let id = e.target.value;
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
                        {/* <span>Created At: {notebook?.createdAt}</span>
                        <span>Updated At: {notebook?.updatedAt}</span> */}
                    {/* <button className="notebook-edit" type="button" name="edit" value={notebook.id} onClick={onEdit}>Edit</button> */}
                    <button type="button" value={notebook.id} onClick={onDelete}>Delete</button>
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
