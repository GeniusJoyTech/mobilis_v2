import { Modal, Button, Form, Dropdown, DropdownItem } from 'react-bootstrap';
import React from 'react';
export default function CustomModal({ titulo, show, onHide, col, handleInputChange, handleSendSubmit, handleDeletSubmit }) {
    return (
        <Modal show={show} onHide={onHide}>
            <Modal.Header closeButton>
                <Modal.Title>{titulo}</Modal.Title>
            </Modal.Header>
            {/* Inicio dropDown */}
            {col != null ? <Dropdown>
                <Dropdown.Toggle variant="secondary">
                    Escolha
                </Dropdown.Toggle>
                <Dropdown.Menu>
                {col.map((l, index) => (
                    <DropdownItem key={index}>{l.nome}</DropdownItem>
                )
                )}
                </Dropdown.Menu>
            </Dropdown>
            :
            <></>}
            {/*Fim DropDown */}
            <Modal.Body>
                <Form>
                    {col.map((coluna) => (
                        coluna.tipo === 'form' && (
                            <Form.Group key={coluna.id} controlId={`form${coluna.nome}`}>
                                <Form.Label>{coluna.nome}</Form.Label>
                                <Form.Control type="text" name={coluna.nome} onChange={handleInputChange} />
                            </Form.Group>
                        )
                    ))}
                </Form>
            </Modal.Body>
            <Modal.Footer>
                <Button variant="primary" onClick={handleSendSubmit}>
                    Salvar Alterações
                </Button>
                {handleDeletSubmit != null ?

                    <Button variant="danger" onClick={handleDeletSubmit}>
                        Deletar
                    </Button>
                    :
                    <></>
                }
            </Modal.Footer>
        </Modal>
    );
}