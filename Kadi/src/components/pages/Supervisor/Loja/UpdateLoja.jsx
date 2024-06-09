import React, { useEffect, useState } from "react";
import Modal from 'react-bootstrap/Modal';
import Button from 'react-bootstrap/Button';
import buscarCEP from "../../../../utils/buscaCep";
import Form from 'react-bootstrap/Form';

import h_api from '../../../../hook/HApi';

export default function Update({ open, close, data, url }) {
    const [send, setSend] = useState(data), [enviando, setEnviando] = useState(false),
        editar = url.editar;

    useEffect(() => {
        setSend(data);
    }, [data]);

    const handleClose = () => {
        setEnviando(false);
        setSend({});
        close();
    };

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
        if(!send.loja){
            alert("Informe o nome da loja!");
            return
        }
        if(!send.cep){
            alert("Informe o cep da loja!");
            return
        }
        if(!send.numero){
            alert("Informe o número da loja!");
            return
        }
        else if(send.numero < 1){
            alert("Verifique o campo de número.");
            setEnviando(false);
            return;
        }
        e.preventDefault();
        setEnviando(true);
        await h_api({ method: 'POST', url: editar, body: send });
        console.log("Enviando para a API para editar:", send, url.editar);
        // Fechar o modal após a edição
        close();
        setEnviando(false);
    };

    return (
        <Modal show={open} onHide={close}>
            <Modal.Header closeButton>
                <Modal.Title>Atualizar</Modal.Title>
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
                        placeholder="Informe o cep."
                        readOnly
                    ></Form.Control>

                    <Form.Label htmlFor="cidade">Cidade</Form.Label>
                    <Form.Control type='text'
                        id='cidade'
                        name='cidade'
                        value={send['cidade'] || ''}
                        onChange={handleInputChange}
                        placeholder="Informe o cep."
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
