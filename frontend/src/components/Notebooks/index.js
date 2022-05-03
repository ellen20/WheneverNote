import React, { useState } from "react";
import * as notebookActions from "../../store/notebook";
import { useDispatch } from "react-redux";
import "./Notebooks.css";
import {NavLink} from 'react-router-dom';

function Notebooks() {
    const dispatch = useDispatch();
    const [title, setTitle] = useState("");
    const [errors, setErrors] = useState([]);

    const onClick = () => {
        setErrors([]);

        // return dispatch(sessionActions.login({ credential: "Demo-lition", password: "password" })).catch(
        //     async (res) => {
        //         const data = await res.json();
        //         if (data && data.errors) setErrors(data.errors);
        //     }
        // );
    }

    const onCancel = () => {

    }
    return (
        <div className="notebooks-page">
            <ul>
                {errors.map((error, idx) => (
                    <li key={idx}>{error} </li>
                ))}
            </ul>
            <table>
                <tr>
                    <th>Title</th>
                    <th>Created At</th>
                    <th>Updated At</th>
                    <th></th>
                    <th></th>
                </tr>
                <tr>
                    <td>title</td>
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
            </table>

        </div>
    );
}

export default Notebooks;
