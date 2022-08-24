import React, { useState } from 'react';
import { Modal } from '../../context/Modal';
import * as notebookActions from "../../store/notebook";
import { useDispatch } from "react-redux";
import "./Notebooks.css";

function NotebooksModal({notebook}) {
    const [showModal, setShowModal] = useState(false);
    const dispatch = useDispatch();

    const onDelete = () => {
        dispatch(notebookActions.deleteNotebook(notebook.id));
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
                            Are you sure to delete <span className='delete-notebook-title'>{notebook.title}</span> notebook?
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

export default NotebooksModal;
