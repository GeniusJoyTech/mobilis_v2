import React, { useState } from 'react';
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import Form from 'react-bootstrap/Form';
import getAuthToken from '../utils/authorization';

function AdicionarDadosModal({ campos, url }) {
  const [show, setShow] = useState(false);
  const [dados, setDados] = useState(campos || {});

  const handleChange = (e) => {
    const { name, value } = e.target;
    setDados((prevDados) => ({ ...prevDados, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const token = getAuthToken();

    await fetch(url, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `${token}`,
      },
      body: JSON.stringify(dados),
    }).then((response) => {
      if (!response.ok) {
        console.log(response);
        throw new Error(`Erro na requisição: ${response.status}`);
      }

      return response.json();
    });

    handleClose();
  };

  const handleShow = () => setShow(true);
  const handleClose = () => setShow(false);

  return (
    <>
      <Button variant="primary" onClick={handleShow}>
        Adicionar
      </Button>

      <Modal show={show} onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title>Adicionar</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form onSubmit={handleSubmit}>
            {Object.keys(dados).map((campo) => (
              <Form.Group key={campo} controlId={`form${campo}`}>
                <Form.Label>{campo.charAt(0).toUpperCase() + campo.slice(1)}</Form.Label>
                <Form.Control
                  type="text"
                  placeholder={`Digite o ${campo}`}
                  name={campo}
                  value={dados[campo]}
                  onChange={handleChange}
                />
              </Form.Group>
            ))}
            <Button variant="primary" type="submit">
              Adicionar
            </Button>
          </Form>
        </Modal.Body>
      </Modal>
    </>
  );
}

export default AdicionarDadosModal;
