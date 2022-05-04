import React, { useState, useEffect } from "react";
import * as notebookActions from "../../store/notebook";
import { useDispatch, useSelector } from "react-redux";
import "./Notebooks.css";
import {NavLink, useHistory} from 'react-router-dom';

function Notebooks() {
    const dispatch = useDispatch();
    const [id, setId] = useState(null);
    const [errors, setErrors] = useState([]);
    const history = useHistory();
    let notebooks = useSelector((state) => state.notebook);
    notebooks = Object.values(notebooks);

    useEffect(() =>{
        dispatch(notebookActions.getNotebooks())
    },[id]);

    const onEdit = () => {
        setErrors([]);

    }

    const onDelete = (e) => {
        setId(e.target.value);
        console.log(">>>>>>>>>", e.target.value)
        dispatch(notebookActions.deleteNotebook(id));
        // history.replace('/notebooks')
        // dispatch(notebookActions.getNotebooks())
    }

    return (
        <div className="notebooks-page">
            <h2>My Notebooks:</h2>
            <NavLink to='/notebook/new' >Create Notebook</NavLink>
            <ul>
                {errors.map((error, idx) => (
                    <li key={idx}>{error} </li>
                ))}
            </ul>
            <ol>
                 {notebooks.map((notebook, idx) => (
                    <li key={idx}>
                        {notebook?.title}
                        {/* Created At: {notebook?.createdAt}
                        Updated At: {notebook?.updatedAt} */}
                    {/* <button className="notebook-edit" type="button" name="edit" value={notebook.id} onClick={onEdit}>Edit</button> */}
                    <button className="notebook-delete" type="button" name='delete' value={notebook.id} onClick={onDelete}>Delete</button>
                    <NavLink to='/note/new'>Create New Note</NavLink>
            </li>))}
            </ol>
        </div>
    );
}

export default Notebooks;
