import React, { useState, useEffect } from 'react';
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import Form from 'react-bootstrap/Form';
import Excluir from './Excluir';
function Editar({ campos, id, urlEdit, urlDel, token, show, handleClose }) {
    const [dados, setDados] = useState(campos || {});

    useEffect(() => {
        setDados(campos || {});
    }, [campos]);

    const handleChange = (e) => {
        const { name, value } = e.target;
        setDados((prevDados) => ({ ...prevDados, [name]: value }));
    };

    const handleSubmit = async (e) => {
        const j = { ...dados, ...id };
        e.preventDefault();
        await fetch(urlEdit, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                Authorization: `${token}`,
            },
            body: JSON.stringify(j),
        }).then((response) => {
            if (!response.ok) {
                console.log(response);
                throw new Error(`Erro na requisição: ${response.status}`);
            }

            return response.json();
        });

        handleClose();
        setTimeout(function () {
            window.location.reload();
        }, 1000);
    };

    return (
        <Modal show={show} onHide={handleClose}>
            <Modal.Header closeButton>
                <Modal.Title>Editar</Modal.Title>
            </Modal.Header>
            <Modal.Body>
                <Form onSubmit={handleSubmit}>
                    {Object.keys(dados).map((campo) => (
                        <Form.Group key={campo} controlId={`form${campo}`}>
                            <Form.Label>{campo.charAt(0).toUpperCase() + campo.slice(1)}</Form.Label>
                            <Form.Control
                                type="text"
                                placeholder={`Digite o novo ${campo}`}
                                name={campo}
                                value={dados[campo]}
                                onChange={handleChange}
                            />
                        </Form.Group>
                    ))}
                    <div style={{ display: 'flex' }}>

                        <Button variant="primary" type="submit">
                            editar
                        </Button>
                        <Excluir
                            id={id}
                            urlDel ={urlDel}
                            token={token}
                        />
                    </div>
                </Form>
            </Modal.Body>
        </Modal>
    );
}

export default Editar;
