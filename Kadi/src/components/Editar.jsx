//Em pt-br me responda
import React, { useState, useEffect } from 'react';
import h_api from '../hook/HApi';
import refreshTime from '../utils/refreshTime';
import CustomModal from './Modal';

function EditModal({ show, onHide, row, form, list, url }) {
    const [lista, setList] = useState({});
    const [formulario, setForm] = useState({});
    const [send, setSend] = useState({});
    useEffect(() => {
        if (typeof row === 'object' && !Array.isArray(row) && Array.isArray(form)) {
            const keys = Object.keys(row);
            const updatedData = {};

            keys.forEach((key) => {
                const matchingObject = form.find((item) => item.hasOwnProperty('nome') && item.nome === key);
                if (matchingObject) {
                    updatedData[matchingObject.nome] = row[key];
                }
            });

            setForm((prevData) => ({ ...prevData, ...updatedData }));
            setSend(row);
        }
    }, [row, form]);

    const handleListChange = (e) => {
        const { name, value } = e.target;
        setList((prevData) => ({ ...prevData, [name]: value }));
        setSend((prevData) => ({ ...prevData, [name]: value }));

    };
    const handleFormChange = (e) => {
        const { name, value } = e.target;
        setForm((prevData) => ({ ...prevData, [name]: value }));
        setSend((prevData) => ({ ...prevData, [name]: value }));

    };

    const handleEditSubmit = async () => {
        await h_api({ method: 'POST', url: url.edit, body: { ...send } });
        onHide();
        refreshTime();
    };

    const handleDeletSubmit = async () => {
        await h_api({ method: 'POST', url: url.del, body: {...send} });
        onHide();
        refreshTime();
    };

    return (
        <>
            <CustomModal
                titulo={'Editar'}
                show={show}
                onHide={onHide}
                form={formulario}
                list={list}
                handleListChange={handleListChange}
                handleFormChange={handleFormChange}
                handleSendSubmit={handleEditSubmit}
                handleDeleteSubmit={handleDeletSubmit}
            />
        </>
    );
}

export default EditModal;
