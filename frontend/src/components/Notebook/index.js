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
    }

    const onCancel = () =>{
      history.replace('/notebooks')
    };

    return (
        <div className="notebook-page" style={{
            position: 'absolute', left: '50%', top: '50%',
            transform: 'translate(-50%, -50%)'
        }} >
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
            <div className="buttons">
            <button type="button" onClick={onClick}>Add Notebook</button>
            <button type="button" onClick={onCancel}>Cancel</button>
            </div>
        </div>
    );
}

export default Notebook;
