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
            <NavLink to='/notebook/new' >Create Notebook</NavLink>
            <ul>
                {errors.map((error, idx) => (
                    <li key={idx}>{error} </li>
                ))}
            </ul>
            <ol>
                 {notebooks.map((notebook, idx) => (
                    <li key={idx}>
                        <span>Title: {notebook?.title}</span>
                        {/* <span>Created At: {notebook?.createdAt}</span>
                        <span>Updated At: {notebook?.updatedAt}</span> */}
                    {/* <button className="notebook-edit" type="button" name="edit" value={notebook.id} onClick={onEdit}>Edit</button> */}
                    <button className="notebook-delete" type="button" name='delete' value={notebook.id} onClick={onDelete}>Delete</button>
                    <NavLink to={`/note/${notebook.id}`} >Create New Note</NavLink>
            </li>))}
            </ol>

            <NavLink to='/'>Cancel</NavLink>
        </div>
    );
}

export default Notebooks;
