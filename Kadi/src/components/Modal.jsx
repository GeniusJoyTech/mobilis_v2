import { Modal, Button, Form, Dropdown, DropdownButton } from 'react-bootstrap';
import React, { useState, useEffect } from 'react';

export default function CustomModal({ titulo, show, onHide, form, list, handleListChange, handleFormChange, handleSendSubmit, handleDeleteSubmit }) {

    const t = list != null ? `Selecione ${[...new Set(list.flatMap(item => Object.keys(item)))].join(' - ')}` : '';
    const [selectedItem, setSelectedItem] = useState(null);
    useEffect(() => {
        setSelectedItem(t);
    }, [t]);

    return (
        <Modal show={show} onHide={onHide}>
            <Modal.Header closeButton>
                <Modal.Title>{titulo}</Modal.Title>
            </Modal.Header>
            {/* Início dropDown */}
            {list && (
                <DropdownButton title={selectedItem} onSelect={(selected) => {
                    const selectedObject = list.find(item => {
                        const eventKeyValue = Object.entries(item).map(([key, value]) => `${key} - ${value}`).join(' - ');
                        return eventKeyValue === selected;
                    });

                    setSelectedItem(selected);

                    if (selectedObject) {
                        Object.entries(selectedObject).forEach(([key, value]) => {
                            handleListChange({
                                target: {
                                    name: key,
                                    value: value,
                                }
                            });
                        });
                    }
                }}>

                    {list.map((item, index) => {
                        const eventKeyValue = Object.entries(item).map(([key, value]) => `${key} - ${value}`).join(' - ');
                        return (
                            <Dropdown.Item key={index} eventKey={eventKeyValue}>
                                {eventKeyValue}
                            </Dropdown.Item>
                        );
                    })}

                </DropdownButton>
            )}

            {/* Fim DropDown */}
            <Modal.Body>
                {form && (
                    <Form>
                        {Object.entries(form).map(([key, value], index) => (
                            <Form.Group key={index} controlId={`form${key}`}>
                                <Form.Label>{key}</Form.Label>
                                <Form.Control type="text" name={key} value={value === null ? '' : value} onChange={handleFormChange} />
                            </Form.Group>
                        ))}
                    </Form>
                )}
            </Modal.Body>
            <Modal.Footer>
                <Button variant="primary" onClick={handleSendSubmit}>
                    Salvar Alterações
                </Button>
                {titulo === 'Editar' && 
                <Button variant="danger" onClick={handleDeleteSubmit}>
                    Deletar
                </Button>}

            </Modal.Footer>
        </Modal>
    );
}
