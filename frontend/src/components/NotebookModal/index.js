import React, { useState } from 'react';
import { Modal } from '../../context/Modal';
import Notebook from './Notebook';

function NotebookModal() {
    const [showModal, setShowModal] = useState(false);

    return (
        <>
            <button onClick={() => setShowModal(true)}>Create New Notebook</button>
            {showModal && (
                <Modal onClose={() => setShowModal(false)}>
                    <Notebook />
                </Modal>
            )}
        </>
    );
}

export default NotebookModal;
