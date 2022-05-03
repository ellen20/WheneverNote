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
    const notebooks = useSelector((state) => state.notebook.notebook);
    console.log(">>>>>>>>>>",notebooks)
    useEffect(() =>{
        dispatch(notebookActions.getNotebooks())
    },[]);

    const onClick = () => {
        setErrors([]);

    }

    const onCancel = () => {
        history.replace('/')
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
                    <button type="button" onClick={onClick}>Edit</button>
                    <button type="button" onClick={onCancel}>Delete</button>
            </li>))}
            </ul>
            {/* <table>
                <tr>
                    <th>Title</th>
                    <th>Created At</th>
                    <th>Updated At</th>
                    <th></th>
                    <th></th>
                </tr>
                <tr>
                    <td>{notebooks.title}</td>
                    <td>createdAt</td>
                    <td>updatedAt</td>
                    <td>
                        <button type="button" onClick={onClick}>Edit</button>
                        <button type="button" onClick={onCancel}>Delete</button>
                    </td>
                    <td>
                        <NavLink to='/note/new'>Create New Note</NavLink>
                    </td>
                </tr>
            </table> */}

        </div>
    );
}

export default Notebooks;
