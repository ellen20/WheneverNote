import React, { useState } from "react";
import * as notebookActions from "../../store/notebook";
import { useDispatch } from "react-redux";
import "./Note.css";

function Notebook() {
    const dispatch = useDispatch();
    const [title, setTitle] = useState("");
    const [errors, setErrors] = useState([]);

    const onClick = () => {
        setErrors([]);
    }

    const onCancel = () => {

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

export default Notebook;
