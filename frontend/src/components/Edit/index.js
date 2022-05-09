import React, { useState } from "react";
import * as noteActions from "../../store/note";
import { useDispatch, useSelector } from "react-redux";
import { useHistory, useParams } from "react-router-dom";

function Edit() {
    const dispatch = useDispatch();
    const [content, setContent] = useState("");
    const [errors, setErrors] = useState([]);
    const history = useHistory();
    const sessionUser = useSelector((state) => state.session.user);
    let notes = useSelector((state) => state.note);
    notes = Object.values(notes);

    let { notebookId, id } = useParams();
    notebookId = parseInt(notebookId, 10);
    id = parseInt(id, 10);

    const defaultNote = notes.filter(note => note.id === id);
    const [title, setTitle] = useState(defaultNote[0]?.title);

    const onEdit = () => {
        setErrors([]);
        history.replace("/notes");
        const newNote = { userId: sessionUser.id, notebookId, title, content };
        dispatch(noteActions.editNote(id, newNote));
    }

    const onCancel = () => {
        history.replace('/notes')
    }
    return (
        <div className="note-page" style={{
            position: 'absolute', left: '50%', top: '50%',
            transform: 'translate(-50%, -50%)'
        }}>

            <label>
                Title:
                <input
                    type="text"
                    value={title}
                    onChange={(e) => setTitle(e.target.value)}
                    required
                    placeholder={defaultNote[0]?.title}
                />
            </label>
            <label>
                Content:
                <textarea
                    value={content}
                    onChange={(e) => setContent(e.target.value)}
                    required
                    placeholder={defaultNote[0]?.content}
                />
            </label>
            <button type="button" onClick={onEdit} disabled={!title}>Edit Note</button>
            <button type="button" onClick={onCancel}>Cancel</button>
        </div>
    );
}

export default Edit;
