import React, { useState } from 'react';
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import Form from 'react-bootstrap/Form';

function Excluir({ id, urlDel, token }) {
    const [showModal, setShowModal] = useState(false);

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const response = await fetch(urlDel, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    Authorization: `${token}`,
                },
                body: JSON.stringify(id),
            });

            if (!response.ok) {
                console.log(response);
                throw new Error(`Erro na requisição: ${response.status}`);
            }

            // Exiba feedback adequado ao usuário, como uma mensagem de sucesso ou atualize a tabela, em vez de recarregar a página
            handleClose();
        } catch (error) {
            console.error(error);
            // Trate erros e forneça feedback ao usuário, se necessário
        }
    };

    const handleClose = () => {
        setShowModal(false);
    };

    const handleShow = () => {
        setShowModal(true);
    };

    return (
        <>
            <Button variant="danger" onClick={handleShow}>
                Excluir
            </Button>

            <Modal show={showModal} onHide={handleClose}>
                <Modal.Header closeButton>
                    <Modal.Title>Excluir</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <Form onSubmit={handleSubmit}>
                        <p>Você tem certeza que deseja excluir?</p>
                        <Button variant="danger" type="submit">
                            Confirmar
                        </Button>
                    </Form>
                </Modal.Body>
            </Modal>
        </>
    );
}

export default Excluir;
