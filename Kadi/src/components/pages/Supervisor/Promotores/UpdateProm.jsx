import React, { useEffect, useState } from "react";
import Modal from 'react-bootstrap/Modal';
import Button from 'react-bootstrap/Button';
import buscarCEP from "../../../../utils/buscaCep";
import Form from 'react-bootstrap/Form';
import backUrl from "../../../../../config";
import h_api from '../../../../hook/HApi';

export default function UpdatePromotores({ open, close, data, url }) {
    const [send, setSend] = useState(data),
        editar = url.editar
    useEffect(() => {
        setSend(data);
    }, [data]);

    const handleClose = () => {
        close()
    };
    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setSend(prevSend => ({
            ...prevSend,
            [name]: value
        }));
    };


    const handleSubmit = async (e) => {
        e.preventDefault();

        console.log("Enviando para a API para editar:", send, url.editar);
        await h_api({ method: 'POST', url: editar, body: send });
        console.log("Enviando para a API para editar:", send, url.editar);
        // Fechar o modal após a edição
        close();
    };

    return (
        <Modal show={open} onHide={close}>
            <Modal.Header closeButton>
                <Modal.Title>Atualizar</Modal.Title>
            </Modal.Header>
            <Modal.Body>
                <form onSubmit={handleSubmit}>
                    <Form.Label htmlFor="nome">Nome</Form.Label>
                    <Form.Control type='text'
                        id='nome'
                        name='nome'
                        value={send['nome'] || ''}
                        onChange={handleInputChange}
                    ></Form.Control>

                    <Form.Label htmlFor="cracha">Crachá</Form.Label>
                    <Form.Control type='text'
                        id='cracha'
                        name='cracha'
                        value={send['cracha'] || ''}
                        onChange={handleInputChange}
                    ></Form.Control>

                    <Form.Label htmlFor="cep">Cep</Form.Label>
                    <Form.Control type='text'
                        id='cep'
                        name='cep'
                        value={send['cep'] || ''}
                        onChange={handleInputChange}
                        onBlur={(e) => { buscarCEP(e.target.value, setSend) }}
                    ></Form.Control>

                    <Form.Label htmlFor="numero">Número</Form.Label>
                    <Form.Control type='number'
                        id='numero'
                        name='numero'
                        value={send['numero'] || ''}
                        onChange={handleInputChange}
                    ></Form.Control>

                    <Form.Label htmlFor="rua">Rua</Form.Label>
                    <Form.Control type='text'
                        id='rua'
                        name='rua'
                        value={send['rua'] || ''}
                        onChange={handleInputChange}
                    ></Form.Control>

                    <Form.Label htmlFor="cidade">Cidade</Form.Label>
                    <Form.Control type='text'
                        id='cidade'
                        name='cidade'
                        value={send['cidade'] || ''}
                        onChange={handleInputChange}
                    ></Form.Control>

                    <Form.Label htmlFor="email">Email</Form.Label>
                    <Form.Control type='text'
                        id='email'
                        name='email'
                        value={send['email'] || ''}
                        onChange={handleInputChange}
                    ></Form.Control>

                </form>
            </Modal.Body>
            <Modal.Footer>
                <Button variant="primary" onClick={handleSubmit}>
                    Salvar Alterações
                </Button>
                <Button variant="primary" onClick={handleClose}>
                    Cancelar
                </Button>
            </Modal.Footer>
        </Modal>
    );
}
