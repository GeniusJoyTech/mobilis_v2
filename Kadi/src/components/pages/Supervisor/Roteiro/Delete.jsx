import React, { useEffect, useState } from "react";
import Modal from 'react-bootstrap/Modal';
import Button from 'react-bootstrap/Button';

import h_api from '../../../../hook/HApi';

export default function Delete({ open, close, data, url }) {
    const deletar = url.deletar;
    

    const handleDelete = async () => {
        // Aqui você pode enviar o objeto `send` para deletar da base de dados
        console.log("Deletando da base de dados:", data, deletar);
        await h_api({ method: 'POST', url: deletar, body: data });
        // Fechar o modal após a exclusão
        close();
    };
    const handleClose = () => {
        close()
    };

    return (
        <Modal show={open} onHide={close}>
            <Modal.Header closeButton>
                <Modal.Title>Deletar</Modal.Title>
            </Modal.Header>
            <Modal.Body>
                <p>Você tem certeza?<br/>Deseja <strong>apagar</strong> este em específico?</p>
            </Modal.Body>
            <Modal.Footer>
                <Button variant="danger" onClick={handleDelete}>
                    Confirmar
                </Button>
                <Button variant="primary" onClick={handleClose}>
                    Cancelar
                </Button>
                
            </Modal.Footer>
        </Modal>
    );
}
