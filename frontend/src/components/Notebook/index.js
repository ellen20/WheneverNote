import React, { useState } from "react";
import * as notebookActions from "../../store/notebook";
import "./Notebook.css";
import { useHistory } from 'react-router-dom';
import { useDispatch, useSelector } from "react-redux";

function Notebook() {
    const dispatch = useDispatch();
    const [title, setTitle] = useState("");
    const [errors, setErrors] = useState([]);
    const history = useHistory();
    const sessionUser = useSelector((state)=> state.session.user);

    const onClick = () => {
        setErrors([]);
        history.replace('/notebooks')
        const newNotebook = { userId: sessionUser.id , title: title };

        dispatch(notebookActions.createNotebook(newNotebook));

        // return dispatch(sessionActions.login({ credential: "Demo-lition", password: "password" })).catch(
        //     async (res) => {
        //         const data = await res.json();
        //         if (data && data.errors) setErrors(data.errors);
        //     }
        // );
    }

    const onCancel = () =>{
      history.replace('/')
    };

    return (
        <div className="notebook-page">
            <ul>
                {errors.map((error, idx) => (
                    <li key={idx}>{error} </li>
                ))}
            </ul>
            <label>
                Title:
                <input
                    type="text"
                    value={title}
                    onChange={(e) => setTitle(e.target.value)}
                    required
                />
            </label>
            <button type="button" onClick={onClick}>Add Notebook</button>
            <button type="button" onClick={onCancel}>Cancel</button>
        </div>
    );
}

export default Notebook;
