import React, { useState } from "react";
import * as notebookActions from "../../store/notebook";
import { useDispatch } from "react-redux";
import { useHistory } from "react-router-dom";
import "./Note.css";

function Note() {
    const dispatch = useDispatch();
    const [title, setTitle] = useState("");
    const [errors, setErrors] = useState([]);
    const history = useHistory();

    const onClick = () => {
        setErrors([]);
        history.replace("/notes")
    }

    const onCancel = () => {
        history.replace('/notebooks')
    }
    return (
        <div className="note-page">
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
            <label>
                Content:
                <textarea
                    value={title}
                    onChange={(e) => setTitle(e.target.value)}
                    required
                />
            </label>
            <button type="button" onClick={onClick}>Add Note</button>
            <button type="button" onClick={onCancel}>Cancel</button>
        </div>
    );
}

export default Note;
