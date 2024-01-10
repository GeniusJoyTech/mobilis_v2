import React, { useState } from 'react';
import {Modal, Button, Form} from 'react-bootstrap';
import h_api from '../hook/HApi';
import refreshTime from '../utils/refreshTime';

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
            console.log("URL:", url); // Log the URL before making the request
            await h_api({ method: 'POST', url: url, body: formData });
            onHide();
            refreshTime();
        } catch (error) {
            console.error("Erro ao buscar dados:", error.message);
        }
    };

    return (
        <Modal show={show} onHide={onHide}>
            <Modal.Header closeButton>
                <Modal.Title>Incluir Dados</Modal.Title>
            </Modal.Header>
            <Modal.Body>
                <Form>
                    {col.map((coluna) => (
                        <Form.Group key={coluna.id} controlId={`form${coluna.nome}`}>
                            <Form.Label>{coluna.nome}</Form.Label>
                            <Form.Control
                                type="text"
                                name={coluna.nome}
                                onChange={handleInputChange}
                            />
                        </Form.Group>
                    ))}
                </Form>
            </Modal.Body>
            <Modal.Footer>
                <Button variant="primary" onClick={handleSendSubmit}>
                    Salvar Alterações
                </Button>
            </Modal.Footer>
        </Modal>
    );
}

export default Incluir;
