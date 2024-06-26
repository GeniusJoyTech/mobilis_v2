import { useState } from "react";
import Modal from 'react-bootstrap/Modal';
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';

import h_api from "../../../../hook/HApi";

export default function UpdateDelete({ open, close, url }) {
    const [send, setSend] = useState({}); // Inicialize send como um objeto vazio

    const [enviando, setEnviando] = useState(false);
    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setSend(prevSend => ({
            ...prevSend,
            [name]: value
        }));
    };

    const handleSubmit = async (e) => {
        if (!send.descricao) {
            alert("Obrigatório adicionar a descrição da atividade.");
            return;
        }
        if (!send.observacao) {
            alert("Obrigatório adicionar uma observacao da atividade.");
            return;
        }
        setEnviando(true)
        e.preventDefault();
        // Aqui você pode enviar o objeto `send` para atualizar/editar na base de dados
        await h_api({ method: 'POST', url: url, body: send });
        console.log("Enviando para a API nova tupla:", send, url);
        close();

        setEnviando(false)
    };

    return (
        <Modal show={open} onHide={close}>
            <Modal.Header closeButton>
                <Modal.Title>Adicionar</Modal.Title>
            </Modal.Header>
            <Modal.Body>
                <form onSubmit={handleSubmit}>
                    {/* Inputs para outros dados */}
                    <Form.Label htmlFor={'descricao'}>{'Descrição'}</Form.Label>
                    <Form.Control
                        type="text"
                        id={'descricao'}
                        name={'descricao'}
                        onChange={handleInputChange}
                    />
                    <Form.Label htmlFor={'observacao'}>{'Observação'}</Form.Label>
                    <Form.Control
                        type="text"
                        id={'observacao'}
                        name={'observacao'}
                        onChange={handleInputChange}
                    />
                </form>
            </Modal.Body>
            <Modal.Footer>
                <Button variant="secondary" onClick={() => { close(); setEnviando(false); }}>
                    Cancelar
                </Button>
                <Button variant="primary" onClick={handleSubmit} disabled={enviando}>
                    Salvar Alterações
                </Button>
            </Modal.Footer>
        </Modal>
    );
}
