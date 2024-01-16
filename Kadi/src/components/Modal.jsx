import { Modal, Button, Form, Dropdown, DropdownItem } from 'react-bootstrap';
import React, { useState } from 'react';

export default function CustomModal({ titulo, show, onHide, col, list, form, handleInputChange, handleSendSubmit, handleDeletSubmit, handleDropdownSelect }) {
    const [selectedItem, setSelectedItem] = useState(null);
    console.log(form);
    return (
        <Modal show={show} onHide={onHide}>
            <Modal.Header closeButton>
                <Modal.Title>{titulo}</Modal.Title>
            </Modal.Header>
            {list != null ?   (
                <Dropdown onSelect={() => {}}>
                    <Dropdown.Toggle variant="secondary">
                        {selectedItem ? `${Object.values(selectedItem).join(', ')}` : 'Escolha'}
                    </Dropdown.Toggle>
                    <Dropdown.Menu>
                        {list.map((item, index) => (
                            <DropdownItem key={index} onClick={() => { 
                                setSelectedItem(item);
                                handleDropdownSelect(item);
                            }}>
                                {Object.keys(item).map((key) => (
                                    `${item[key]}`
                                )).join(' - ')}
                            </DropdownItem>
                        ))}
                    </Dropdown.Menu>
                </Dropdown>
            ) : null}
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
                    null
                }
            </Modal.Footer>
        </Modal>
    );
}
