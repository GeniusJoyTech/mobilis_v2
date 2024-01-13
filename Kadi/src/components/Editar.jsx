import React, { useState, useEffect } from 'react';
import h_api from '../hook/HApi';
import refreshTime from '../utils/refreshTime';
import CustomModal from './Modal';

function EditModal({ show, onHide, row, col, url }) {

    const [data, setData] = useState(row);
    useEffect(() => {
        setData(row);
    }, [row]);
    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setData((prevData) => ({ ...prevData, [name]: value }));
    };
    const handleEditSubmit = async () => {
        await h_api({ method: 'POST', url: url.edit, body: data });
        onHide();
        refreshTime();
    };
    const handleDeletSubmit = async () => {
        await h_api({ method: 'POST', url: url.del, body: data });
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
