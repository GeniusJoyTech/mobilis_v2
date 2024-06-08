import React, { useEffect, useState } from "react";
import Modal from 'react-bootstrap/Modal';
import Button from 'react-bootstrap/Button';

import h_api from '../../../../hook/HApi';

export default function Delete({ open, close, data, url }) {
    const deletar = url.deletar;
    const [enviando, setEnviando]=useState(false);
    

    const handleDelete = async () => {
        setEnviando(true);
        // Aqui você pode enviar o objeto `send` para deletar da base de dados
        console.log("Inativando na base de dados:", data, deletar);
        await h_api({ method: 'POST', url: deletar, body: data });
        // Fechar o modal após a exclusão
        close();
        setEnviando(false);
    };
    const handleClose = () => {
        setEnviando(false);
        close();
    };

    return (
        <Modal show={open} onHide={close}>
            <Modal.Header closeButton>
                <Modal.Title>Promotor {data.status} no sistema.</Modal.Title>
            </Modal.Header>
            <Modal.Body>
                <p>Você tem certeza que deseja alterar?</p>
            </Modal.Body>
            <Modal.Footer>
                <Button variant="danger" onClick={handleDelete} disabled={enviando}>
                    Confirmar
                </Button>
                <Button variant="primary" onClick={handleClose}>
                    Cancelar
                </Button>
                
            </Modal.Footer>
        </Modal>
    );
}
