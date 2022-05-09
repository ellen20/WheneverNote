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
        alert("Are you sure to delete this notebook?");
        dispatch(notebookActions.deleteNotebook(id));
    }

    return (
        <div className="notebooks-page">
            <h2>{sessionUser?.username}'s Notebooks:</h2>
            <NavLink to='/notebook/new' style={{textDecoration: "none"}} >
                <i class="fa-solid fa-plus"></i>
                NEW<i class="fa-solid fa-book"></i>
            </NavLink>
            <ul>
                {notebooks.map((notebook, idx) => (
                    <li className="notebook-list" key={idx}>
                        Notebook: {notebook?.title}
                        <NavLink to={`/note/${notebook.id}`} style={{ textDecoration: "none" }} >
                            <i class="fa-solid fa-plus"></i>
                            NEW<i class="fa-solid fa-note-sticky"></i>
                        </NavLink>
                        <button type="button" value={notebook.id} onClick={(e)=>onDelete(e)}>
                            <i class="fa-solid fa-trash-can"></i>
                        </button>
                    </li>))}
            </ul>
        </div>
    );
}

export default Notebooks;
