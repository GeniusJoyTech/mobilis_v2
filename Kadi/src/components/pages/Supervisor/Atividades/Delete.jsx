import Modal from 'react-bootstrap/Modal';
import Button from 'react-bootstrap/Button';

import h_api from '../../../../hook/HApi';
import { useState } from 'react';

export default function Delete({ open, close, data, url }) {
    const deletar = url.deletar;
    const [eniviando, setEnviando] = useState(false);
    

    const handleDelete = async () => {
        setEnviando(true);
        // Aqui você pode enviar o objeto `send` para deletar da base de dados
        console.log("Inativando na base de dados:", data, deletar);
        await h_api({ method: 'POST', url: deletar, body: data });
        // Fechar o modal após a exclusão
        handleClose();
    };
    const handleClose = () => {
        close()
        setEnviando(false);
    };

    return (
        <Modal show={open} onHide={close}>
            <Modal.Header closeButton>
                <Modal.Title>Deletar {data.descricao}.</Modal.Title>
            </Modal.Header>
            <Modal.Body>
                <p>Você tem certeza?</p>
            </Modal.Body>
            <Modal.Footer>
                <Button variant="danger" onClick={handleDelete} disabled={eniviando}>
                    Confirmar
                </Button>
                <Button variant="primary" onClick={handleClose}>
                    Cancelar
                </Button>
                
            </Modal.Footer>
        </Modal>
    );
}
