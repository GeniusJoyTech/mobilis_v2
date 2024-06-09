import React, { useState } from "react";
import Modal from 'react-bootstrap/Modal';
import Button from 'react-bootstrap/Button';

import h_api from '../../../../hook/HApi';

export default function Delete({ open, close, data, url }) {
    const deletar = url.deletar;
    const [enviando, setEnviando] = useState(false);
    

    const handleDelete = async () => {
        setEnviando(true);
        await h_api({ method: 'POST', url: deletar, body: data });
        setEnviando(false);
        close();
    };
    const handleClose = () => {
        close()
    };

    return (
        <Modal show={open} onHide={close}>
            <Modal.Header closeButton>
                <Modal.Title>Usuário cadastrado no sistema.</Modal.Title>
            </Modal.Header>
            <Modal.Body>
                <p>Você tem certeza que deseja excluir o <strong>{data.cargo}</strong> {data.nome}?</p>

                <p>Todos seus dados serão excluídos do sistema.</p>
                

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
