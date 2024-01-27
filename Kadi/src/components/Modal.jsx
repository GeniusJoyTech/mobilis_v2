import { Modal, Button, Form, Dropdown, DropdownItem } from 'react-bootstrap';
import React from 'react';
export default function CustomModal({ titulo, show, onHide, col, form, list, handleInputChange, handleSendSubmit, handleDeletSubmit }) {
    //{ titulo === 'Incluir' ? console.log('incluir', form) : console.log('editar', form) }
    return (
        <Modal show={show} onHide={onHide}>
            <Modal.Header closeButton>
                <Modal.Title>{titulo}</Modal.Title>
            </Modal.Header>
            {/* Inicio dropDown */}
            {list != null && <Dropdown>
                <Dropdown.Toggle variant="secondary">
                    Selecione para {titulo}
                </Dropdown.Toggle>
                <Dropdown.Menu>
                    {list.map((item, index) => (
                        <DropdownItem key={index}>{Object.values(item).join(' - ')}</DropdownItem>
                    )
                    )}
                </Dropdown.Menu>
            </Dropdown>}
            {/*Fim DropDown */}
            <Modal.Body>
                {form != null 
                &&
                (
                    <Form>
                    {Object.entries(form).map(([key, value], index) => (
                        <Form.Group key={index} controlId={`form${key}`}>
                            <Form.Label>{key}</Form.Label>
                            <Form.Control type="text" name={key} value={value === null ? '' : value} onChange={handleInputChange} />
                        </Form.Group>
                    ))}
                </Form>
                )
                }
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