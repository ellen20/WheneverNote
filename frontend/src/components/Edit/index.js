import React, { useState } from "react";
import * as noteActions from "../../store/note";
import { useDispatch, useSelector } from "react-redux";
import { useHistory, useParams } from "react-router-dom";
// import "./Note.css";

function Edit() {
    const dispatch = useDispatch();
    const [title, setTitle] = useState("");
    const [content, setContent] = useState("");
    const [errors, setErrors] = useState([]);
    const history = useHistory();
    const sessionUser = useSelector((state) => state.session.user);
    let { notebookId, id } = useParams();
    notebookId = parseInt(notebookId, 10);
    id = parseInt(id, 10);

    const onEdit = () => {
        setErrors([]);
        history.replace("/notes");
        const newNote = { userId: sessionUser.id, notebookId, title, content };
        console.log(">>>>>>>",newNote)
        dispatch(noteActions.editNote(id, newNote));
    }

    const onCancel = () => {
        history.replace('/notes')
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
                    placeholder={title}
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
            <button type="button" onClick={onEdit}>Edit Note</button>
            <button type="button" onClick={onCancel}>Cancel</button>
        </div>
    );
}

export default Edit;
