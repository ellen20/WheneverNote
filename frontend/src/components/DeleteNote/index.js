import React, { useState } from "react";
import * as noteActions from "../../store/note";
import { useDispatch, useSelector } from "react-redux";
import { useHistory, useParams } from "react-router-dom";
// import "./Note.css";

function DeleteNote() {
    const dispatch = useDispatch();
    const history = useHistory();
    const sessionUser = useSelector((state) => state.session.user);
    let notes = useSelector((state) => state.note);
    notes = Object.values(notes);
    const { id } = useParams();
    id = parseInt(id, 10);

    const defaultNote = notes.filter(note => note.id === id);
    // const [title, setTitle] = useState(defaultNote[0].title);

    const onDelete = () => {
        // dispatch(noteActions.deleteNote(id));
    };

    const onCancel = () => {
        history.replace('/notes')
    }
    return (
        <div >
            <h2>Are you sure to delete this note?</h2>
            {/* <label>
                Title:
                <input
                    type="text"
                    placeholder={defaultNote[0]?.title}
                    disabled={true}
                />
            </label>
            <label>
                Content:
                <textarea
                    placeholder={defaultNote[0]?.content}
                    disabled={true}
                />
            </label> */}
            <button type="button" onClick={onDelete} >Delete</button>
            <button type="button" onClick={onCancel}>Cancel</button>
        </div>
    );
}

export default DeleteNote;
