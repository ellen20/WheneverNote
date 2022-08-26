import React, { useState } from 'react';
import { Modal } from '../../context/Modal';
import * as noteActions from "../../store/note";
import { useDispatch } from "react-redux";
import "./Notes.css";

function NotesModal({note}) {
    const [showModal, setShowModal] = useState(false);
    const dispatch = useDispatch();

    const onDelete = () => {
        dispatch(noteActions.deleteNote(note.id));
        setShowModal(false)
    }

    return (
        <>
            <button onClick={() => setShowModal(true)}>
                <i class="fa-solid fa-trash-can"></i>
            </button>
            {showModal && (
                <Modal onClose={() => setShowModal(false)}>
                    <div className='delete-notebook-box'>
                        <div className='delete-notebook-msg'>
                            Are you sure to delete <span className='delete-notebook-title'>{note.title}</span> note?
                        </div>
                        <div className='delete-notebook-btn'>
                            <button className='yes-btn'onClick={onDelete}>Yes</button>
                            <button className='cancel-btn' onClick={() => setShowModal(false)}>Cancel</button>
                        </div>
                    </div>
                </Modal>
            )}
        </>
    );
}

export default NotesModal;
