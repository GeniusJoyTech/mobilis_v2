import React, { useState, useEffect } from 'react';
import h_api from '../hook/HApi';
import refreshTime from '../utils/refreshTime';
import CustomModal from './Modal';

function EditModal({ show, onHide, row, col, form, list, url }) {
    const [data, setData] = useState(form);

    useEffect(() => {
        if (typeof row === 'object' && !Array.isArray(row) && Array.isArray(form)) {
            // Obter as chaves do objeto row
            const keys = Object.keys(row);

            // Mapear as chaves e verificar se existe um objeto correspondente em form
            const updatedData = {};
            keys.forEach((key) => {
                const matchingObject = form.find((item) => item.hasOwnProperty('nome') && item.nome === key);
                if (matchingObject) {
                    updatedData[matchingObject.nome] = row[key];
                }
            });

            // Atualizar o estado com o resultado do match
            setData((prevData) => ({ ...prevData, ...updatedData }));
        }
    }, [row, form]);

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
        <>
            <CustomModal
                titulo={'Editar'}
                show={show}
                onHide={onHide}
                col={col}
                form={data}
                list={list}
                handleInputChange={handleInputChange}
                handleSendSubmit={handleEditSubmit}
                handleDeletSubmit={handleDeletSubmit}
            />
        </>
    );
}

export default EditModal;
