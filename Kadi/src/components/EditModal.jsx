import React, { useState, useEffect } from 'react';
import Modal from 'react-bootstrap/Modal';
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import h_api from '../hook/HApi';

function EditModal({ show, onHide, lin, col, url }) {
    const [editedData, setEditedData] = useState(lin);
    useEffect(() => {
        // Atualiza o estado quando a linha é alterada
        setEditedData(lin);
    }, [lin]);
    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setEditedData((prevData) => ({ ...prevData, [name]: value }));
    };
    const handleEditSubmit = async () => {
        await h_api({ method: 'POST', url: url.edit, body: editedData });
        onHide(); // Fechar o modal após a edição
    };

    const handleDeletSubmit = async () => {
        await h_api({ method: 'POST', url: url.del, body: editedData });
        onHide(); // Fechar o modal após a edição
    };

    return (
        <Modal show={show} onHide={onHide}>
            <Modal.Header closeButton>
                <Modal.Title>Editar Dados</Modal.Title>
            </Modal.Header>
            <Modal.Body>
                <Form>
                    {col.map((coluna) => (
                        <Form.Group key={coluna.id} controlId={`form${coluna.id}`}>
                            <Form.Label>{coluna.nome}</Form.Label>
                            <Form.Control
                                type="text"
                                name={coluna.nome}
                                value={editedData[coluna.nome] || ''}
                                onChange={handleInputChange}
                            />
                        </Form.Group>
                    ))}
                </Form>
            </Modal.Body>
            <Modal.Footer>
                <Button variant="danger" onClick={handleDeletSubmit}>
                    Deletar
                </Button>
                <Button variant="primary" onClick={handleEditSubmit}>
                    Salvar Alterações
                </Button>
            </Modal.Footer>
        </Modal>
    );
}

export default EditModal;
