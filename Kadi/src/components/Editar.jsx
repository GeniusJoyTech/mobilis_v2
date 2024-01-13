import React, { useState, useEffect } from 'react';
import h_api from '../hook/HApi';
import refreshTime from '../utils/refreshTime';
import CustomModal from './Modal';

function EditModal({ show, onHide, lin, col, url }) {

    const [editedData, setEditedData] = useState(lin);
    useEffect(() => {
        setEditedData(lin);
    }, [lin]);
    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setEditedData((prevData) => ({ ...prevData, [name]: value }));
    };
    const handleEditSubmit = async () => {
        await h_api({ method: 'POST', url: url.edit, body: editedData });
        onHide();
        refreshTime();
    };
    const handleDeletSubmit = async () => {
        await h_api({ method: 'POST', url: url.del, body: editedData });
        onHide();
        refreshTime();
    };


    return (
        <CustomModal
            titulo={'Editar'}
            show={show}
            onHide={onHide}
            col={col}
            handleInputChange={handleInputChange}
            handleSendSubmit={handleEditSubmit}
            handleDeletSubmit={handleDeletSubmit}
        />
    );
}

export default EditModal;
