import React, { useState } from 'react';
import h_api from '../hook/HApi';
import refreshTime from '../utils/refreshTime';
import CustomModal from './Modal';


function Incluir({ show, onHide, col, url }) {
    const [formData, setFormData] = useState({});

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setFormData((prevData) => ({
            ...prevData,
            [name]: value,
        }));
    };

    const handleSendSubmit = async () => {
        try {
            await h_api({ method: 'POST', url: url, body: formData });
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
            handleInputChange={handleInputChange}
            handleSendSubmit={handleSendSubmit}

        />
    );
}

export default Incluir;
