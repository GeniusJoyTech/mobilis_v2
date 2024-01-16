import React, { useState } from 'react';
import h_api from '../hook/HApi';
import refreshTime from '../utils/refreshTime';
import CustomModal from './Modal';

function Incluir({ show, onHide, col, list, form, url }) {
    const [formData, setFormData] = useState({});
    const [selectedItem, setSelectedItem] = useState(null);
    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setFormData((prevData) => ({
            ...prevData,
            [name]: value,
        }));
    };
    const handleDropdownSelect = (item) => {
        setSelectedItem(item);
    };

    const handleSendSubmit = async () => {
        try {
            const dataToSend = { ...formData, selectedItem };
            
            await h_api({ method: 'POST', url: url, body: dataToSend });
            onHide();
            refreshTime();
        } catch (error) {
            console.error("Erro ao buscar dados:", error.message);
        }
    };

    return (
        <CustomModal
            titulo={'Incluir'}
            show={show}
            onHide={onHide}
            col={col}
            list={list}
            form={form}
            handleInputChange={handleInputChange}
            handleDropdownSelect={handleDropdownSelect}
            handleSendSubmit={handleSendSubmit}
        />
    );
}

export default Incluir;
