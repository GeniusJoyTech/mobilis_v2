import React, { useState, useEffect } from 'react';
import h_api from '../hook/HApi';
import refreshTime from '../utils/refreshTime';
import CustomModal from './Modal';

function EditModal({ show, onHide, row, col, list, form, url }) {

    const [selectedItem, setSelectedItem] = useState(null);
    const [data, setData] = useState(row);
    useEffect(() => {
        setData(row);
    }, [row]);
    const handleDropdownSelect = (item) => {
        setSelectedItem(item);
    };

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setData((prevData) => ({ ...prevData, [name]: value }));
    };
    const handleEditSubmit = async () => {
        const dataToSend = { ...formData, selectedItem };
        await h_api({ method: 'POST', url: url, body: dataToSend });
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
            list={list}
            form={form}
            handleInputChange={handleInputChange}
            handleSendSubmit={handleEditSubmit}
            handleDeletSubmit={handleDeletSubmit}
            handleDropdownSelect={handleDropdownSelect}
        />
    );
}

export default EditModal;
