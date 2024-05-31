import React, { useEffect, useState } from "react";
import Modal from 'react-bootstrap/Modal';
import Button from 'react-bootstrap/Button';
import buscarCEP from "../../../../utils/buscaCep";
import Form from 'react-bootstrap/Form';
import backUrl from "../../../../../config";
import h_api from '../../../../hook/HApi';

export default function UpdatePromotores({ open, close, data, url }) {
    const [send, setSend] = useState(data);
    const editar = url.editar;
    const [emailError, setEmailError] = useState(false);
    const [enviando, setEnviando]= useState(false);

    const validateEmail = (email) => {
        const re = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
        return re.test(String(email).toLowerCase());
    };
    useEffect(() => {
        setSend(data);
    }, [data]);

    const handleClose = () => {
        close();
        setEnviando(false);
    };
    const handleInputChange = (e) => {
        const { name, value } = e.target;

        if (name === 'cep') {
            let cepValue = value.replace(/\D/g, '');
            if (cepValue.length > 8) {
                cepValue = cepValue.slice(0, 8);
            }
            cepValue = cepValue.replace(/^(\d{5})(\d)/, '$1-$2');
            setSend(prevSend => ({
                ...prevSend,
                [name]: cepValue
            }));
        } else if (name === 'email') {
            setEmailError(!validateEmail(value));
            setSend(prevSend => ({
                ...prevSend,
                [name]: value
            }));
        } else {
            setSend(prevSend => ({
                ...prevSend,
                [name]: value
            }));
        }
    };


    const handleSubmit = async (e) => {
        setEnviando(true);
        e.preventDefault();
        if (!send.email) {
            alert("O campo de e-mail é obrigatório.");
            setEnviando(false);
            return;
        }
        if (emailError) {
            alert("Por favor, corrija o e-mail antes de enviar.");
            setEnviando(false);
            return;
        }
        console.log("Enviando para a API nova tupla:", send, editar);
        await h_api({ method: 'POST', url: editar, body: send });
        console.log("Enviando para a API nova tupla:", send, editar);
        handleClose();
        setEnviando(false);
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

                    <Form.Label htmlFor="email">Email</Form.Label>
                    <Form.Control type='text'
                        id='email'
                        name='email'
                        value={send['email'] || ''}
                        onChange={handleInputChange}
                        isInvalid={emailError}
                        required
                    ></Form.Control>
                    <Form.Control.Feedback type="invalid">
                        Por favor, insira um e-mail válido.
                    </Form.Control.Feedback>
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
