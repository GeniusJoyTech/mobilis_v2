import React, { useState, useEffect } from 'react';
import h_api from '../hook/HApi';
import refreshTime from '../utils/refreshTime';
import CustomModal from './Modal';

function Incluir({ show, onHide, form, list, url }) {

    const f = form != null ? Object.fromEntries(form.map(item => [item.nome, ''])) : '' ;
    const [lista, setList] = useState({});
    const [formulario, setForm] = useState({});
    const [send, setSend] = useState({});

    useEffect(() => {
        setForm(f);
        setList(list);
    }, [form]);

    const handleListChange = (e) => {
        const { name, value } = e.target;
        setList((prevData) => ({ ...prevData, [name]: value }));
        setSend((prevData) => ({ ...prevData, [name]: value }));
        console.log(send);

    };
    const handleFormChange = (e) => {
        const { name, value } = e.target;
        setForm((prevData) => ({ ...prevData, [name]: value }));
        setSend((prevData) => ({ ...prevData, [name]: value }));
    };

    const handleEditSubmit = async () => {
        try {
            await h_api({ method: 'POST', url: url, body: send });
            onHide();
            refreshTime();
        } catch (error) {
            console.error("Erro ao buscar dados:", error.message);
        }
    };
    return (
        <>
            <CustomModal
                titulo={'Incluir'}
                show={show}
                onHide={onHide}
                form={formulario}
                list={lista}
                handleListChange={handleListChange}
                handleFormChange={handleFormChange}
                handleSendSubmit={handleEditSubmit}
            />
        </>
    );
}

export default Incluir;
