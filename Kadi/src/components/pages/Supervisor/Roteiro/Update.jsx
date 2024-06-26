import React, { useEffect, useState } from "react";
import Modal from 'react-bootstrap/Modal';
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';

import h_api from '../../../../hook/HApi';

export default function Update({ open, close, promotores, lojas, data, url }) {
    const [enviando, setEnviando] = useState(false);
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
    const handleSelectChange = (e) => {
        const { name, value } = e.target;
        setSend(prevSend => ({
            ...prevSend,
            [name]: value
        }));
    };


    const handleSubmit = async (e) => {
        e.preventDefault();

        if (!send.id_usuario) {
            alert('Necessário selecionar um promotor.');
            return;
        }
        if (!send.loja) {
            alert('Necessário a loja para o roteiro.');
            return;
        }
        if (!send.ciclo) {
            alert('O ciclo é importante, pois representa a repetição da visita do promotor.');
            return;
        }

        if (!send.diavisita) {
            alert('Por favor informe quando será o primeiro dia da visita.');
            return;
        }
        setEnviando(true);
        // Aqui você pode enviar o objeto `send` para atualizar/editar na base de dados
        await h_api({ method: 'POST', url: editar, body: send });
        close();
        setSend({});
        setEnviando(false);
    };
    return (
        <Modal show={open} onHide={close}>
            <Modal.Header closeButton>
                <Modal.Title>Atualizar</Modal.Title>
            </Modal.Header>
            <Modal.Body>
                <form onSubmit={handleSubmit}>
                <Form.Label htmlFor={'promotores'}>Promotores</Form.Label>
                    <Form.Select id={'promotores'} name={'promotores'} onChange={handleSelectChange}>
                        <option key={`A`} value={send.id_usuario || ''}>{'Atual: '+ send.nome || 'Selecione um Promotor'}</option>
                        {promotores && promotores.map((p, index) => (
                            <option key={index} value={p.id_usuario}>{p.nome} - {p.status} - {p.cracha}</option>
                        ))}
                    </Form.Select>
                    
                    <Form.Label htmlFor={'loja'}>Lojas</Form.Label>
                    <Form.Select id={'loja'} name={'loja'} onChange={handleSelectChange}>
                        <option key={`B`} value={send.id_loja || ''}>{'Atual: '+ send.loja || 'Selecione uma Loja'}</option>
                        {lojas && lojas.map((l, index) => (
                            <option key={index} value={l.id_loja}>{l.loja} - {l.rua} - {l.numero}</option>
                        ))}
                    </Form.Select>
                    <Form.Label htmlFor={'ciclo'}>Ciclo se repete a cada</Form.Label>
                    <div>
                        <Form.Check
                            inline
                            type='radio'
                            id='semanal'
                            name='ciclo'
                            label='uma semana'
                            value={1}
                            checked={send['ciclo'] == 1}
                            onChange={handleInputChange}
                        />
                        <Form.Check
                            inline
                            type='radio'
                            id='duasSemanas'
                            name='ciclo'
                            label='duas semanas'
                            value={2}
                            checked={send['ciclo'] == 2}
                            onChange={handleInputChange}
                        /><br />
                        <Form.Check
                            inline
                            type='radio'
                            id='tresSemanas'
                            name='ciclo'
                            label='três semanas'
                            value={3}
                            checked={send['ciclo'] == 3}
                            onChange={handleInputChange}
                        />
                        <Form.Check
                            inline
                            type='radio'
                            id='quatroSemanas'
                            name='ciclo'
                            label='quatro semanas'
                            value={4}
                            checked={send['ciclo'] == 4}
                            onChange={handleInputChange}
                        />
                    </div>

                    <Form.Label htmlFor={'diavisita'}>Dia da visita</Form.Label>
                    <Form.Control
                        type="date"
                        id='diavisita'
                        name='diavisita'
                        value={send.diavisita ? send.diavisita.slice(0, 10) : ''}
                        onChange={handleInputChange}
                    />

                </form>
            </Modal.Body>
            <Modal.Footer>
                <Button variant="primary" onClick={handleSubmit} disabled={enviando}>
                    Salvar Alterações
                </Button>
                <Button variant="primary" onClick={handleClose}>
                    Cancelar
                </Button>
            </Modal.Footer>
        </Modal>
    );
}
