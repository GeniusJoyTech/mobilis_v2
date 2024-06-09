import React, { useEffect, useState } from "react";
import Modal from 'react-bootstrap/Modal';
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import h_api from '../../../../hook/HApi';

export default function Update({ open, close, data, url }) {
    const [send, setSend] = useState(data),
        editar = url.editar
        const [enviando, setEnviando] = useState(false);
    useEffect(() => {
        setSend(data);
    }, [data]);

    const handleClose = () => {
        close()
        setEnviando(false)
    };
    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setSend(prevSend => ({
            ...prevSend,
            [name]: value
        }));
    };


    const handleSubmit = async (e) => {
        setEnviando(true);
        e.preventDefault();
        await h_api({ method: 'POST', url: editar, body: send });
        console.log("Enviando para a API para editar:", send, url.editar);
        // Fechar o modal após a edição
        close();
        setEnviando(false);
    };

    return (
        <Modal show={open} onHide={close}>
            <Modal.Header closeButton>
                <Modal.Title>Atualizar</Modal.Title>
            </Modal.Header>
            <Modal.Body>
                <form onSubmit={handleSubmit}>
                <Form.Label htmlFor={'descricao'}>{'Descrição'}</Form.Label>
                            <Form.Control
                                type="text"
                                id={'descricao'}
                                name={'descricao'}
                                value={send.descricao || ''}
                                onChange={handleInputChange}
                            />
                            <Form.Label htmlFor={'observacao'}>{'Observação'}</Form.Label>
                            <Form.Control
                                type="text"
                                id={'observacao'}
                                name={'observacao'}
                                value={send.observacao || ''}
                                onChange={handleInputChange}
                            />
                </form>
            </Modal.Body>
            <Modal.Footer>
                <Button variant="primary" onClick={handleSubmit} disabled={enviando}>
                    Salvar Alterações
                </Button>
                <Button variant="primary" onClick={handleClose}>
                    Cancelar
                </Button>
            </Modal.Footer>
        </Modal>
    );
}
