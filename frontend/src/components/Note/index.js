import React, { useState } from "react";
import * as noteActions from "../../store/note";
import { useDispatch, useSelector } from "react-redux";
import { useHistory, useParams } from "react-router-dom";
import "./Note.css";

function Note() {
    const dispatch = useDispatch();
    const [title, setTitle] = useState("");
    const [content, setContent] = useState("");
    const [errors, setErrors] = useState([]);
    const history = useHistory();
    const sessionUser = useSelector((state) => state.session.user);
    let {notebookId} = useParams();
    notebookId = parseInt(notebookId, 10);

    const onAdd = () => {
        setErrors([]);
        history.replace("/notes");
        const newNote = { userId: sessionUser.id, notebookId, title, content };
        // console.log(">>>>>>>",newNote)
        dispatch(noteActions.createNote(newNote));
    }

    const onCancel = () => {
        history.replace('/notebooks')
    }
    return (
        <div className="note-page" style={{
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
            <label>
                Content:
                <textarea
                    value={content}
                    onChange={(e) => setContent(e.target.value)}
                    required
                />
            </label>
            <div className="buttons">
                <button type="button" onClick={onAdd} disabled={!title}>Add Note</button>
                <button type="button" onClick={onCancel}>Cancel</button>
            </div>
        </div>
    );
}

export default Note;
