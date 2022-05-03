import React, { useState, useEffect } from "react";
import * as notebookActions from "../../store/notebook";
import { useDispatch, useSelector } from "react-redux";
import "./Notebooks.css";
import {NavLink, useHistory} from 'react-router-dom';

function Notebooks() {
    const dispatch = useDispatch();
    const [title, setTitle] = useState("");
    const [errors, setErrors] = useState([]);
    const history = useHistory();
    let notebooks = useSelector((state) => state.notebook);
    notebooks = Object.values(notebooks);

    useEffect(() =>{
        dispatch(notebookActions.getNotebooks())
    },[]);

    const onEdit = () => {
        setErrors([]);

    }

    const onDelete = () => {
        dispatch(notebookActions.deleteNotebook())
    }

    return (
        <div className="notebooks-page">
            <h2>My Notebooks:</h2>
            <ul>
                {errors.map((error, idx) => (
                    <li key={idx}>{error} </li>
                ))}
            </ul>
            <ul>
                 {notebooks.map((notebook, idx) => (
                    <li key={idx}>{notebook?.title} {notebook?.createdAt} {notebook?.updatedAt}
                    <button type="button" onClick={onEdit}>Edit</button>
                    <button type="button" onClick={onDelete}>Delete</button>
                    <NavLink to='/note/new'>Create New Note</NavLink>
            </li>))}
            </ul>
        </div>
    );
}

export default Notebooks;
