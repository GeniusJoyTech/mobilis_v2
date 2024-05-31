import React, { useState } from "react";
import Modal from 'react-bootstrap/Modal';
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import buscarCEP from '../../../../utils/buscaCep'
import h_api from "../../../../hook/HApi";

export default function CreateLoja({ open, close, url }) {
    const [send, setSend] = useState({});

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setSend(prevSend => ({
            ...prevSend,
            [name]: value
        }));
    };

    const formatCEP = (value) => {
        return value
            .replace(/\D/g, '') // Remove caracteres não numéricos
            .slice(0, 8) // Limita o tamanho para 8 caracteres
            .replace(/^(\d{5})(\d)/, '$1-$2'); // Adiciona o hífen após os primeiros 5 dígitos
    };

    const formatCelular = (value) => {
        return value
            .replace(/\D/g, '') // Remove caracteres não numéricos
            .slice(0, 11) // Limita o tamanho para 11 caracteres
            .replace(/^(\d{2})(\d{5})(\d{4}).*/, '($1) $2-$3'); // Formata para (XX) XXXXX-XXXX
    };

    const handleCepChange = (e) => {
        const { value } = e.target;
        setSend(prevSend => ({
            ...prevSend,
            cep: formatCEP(value)
        }));
    };

    const handleCelularChange = (e) => {
        const { value } = e.target;
        setSend(prevSend => ({
            ...prevSend,
            celular: formatCelular(value)
        }));
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        await h_api({ method: 'POST', url: url, body: send });
        setSend({});
        close();
    };

    return (
        <Modal show={open} onHide={close}>
            <Modal.Header closeButton>
                <Modal.Title>Adicionar</Modal.Title>
            </Modal.Header>
            <Modal.Body>
                <form onSubmit={handleSubmit}>
                    <Form.Label htmlFor="loja">Loja</Form.Label>
                    <Form.Control type='text'
                        id='loja'
                        name='loja'
                        value={send['loja'] || ''}
                        onChange={handleInputChange}
                    ></Form.Control>

                    <Form.Label htmlFor="cep">Cep</Form.Label>
                    <Form.Control type='text'
                        id='cep'
                        name='cep'
                        value={send['cep'] || ''}
                        onChange={handleCepChange}
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
                        readOnly
                    ></Form.Control>

                    <Form.Label htmlFor="cidade">Cidade</Form.Label>
                    <Form.Control type='text'
                        id='cidade'
                        name='cidade'
                        value={send['cidade'] || ''}
                        onChange={handleInputChange}
                        readOnly
                    ></Form.Control>

                    <Form.Label htmlFor="celular">Celular</Form.Label>
                    <Form.Control type='tel'
                        id='celular'
                        name='celular'
                        value={send['celular'] || ''}
                        onChange={handleCelularChange}
                    ></Form.Control>

                </form>
            </Modal.Body>
            <Modal.Footer>
                <Button variant="secondary" onClick={close}>
                    Cancelar
                </Button>
                <Button variant="primary" onClick={handleSubmit}>
                    Salvar Alterações
                </Button>
            </Modal.Footer>
        </Modal>
    );
}
