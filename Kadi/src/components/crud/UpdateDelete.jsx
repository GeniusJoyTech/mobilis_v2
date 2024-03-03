import React, { useEffect, useState } from "react";
import Modal from 'react-bootstrap/Modal';
import Button from 'react-bootstrap/Button';
import Selects from "./details/Selects";
import Form from 'react-bootstrap/Form';

import h_api from '../../hook/HApi';

export default function UpdateDelete({ open, close, exibir, data, dropItens, url }) {
    const [send, setSend] = useState(data),
    editar = url.editar, deletar = url.deletar;
    useEffect(() => {
        setSend(data);
    }, [data]);

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setSend(prevSend => ({
            ...prevSend,
            [name]: value
        }));
    };
    const handleSelectChange = (e) => {
        const { name, value } = e.target;
        // Busca o item selecionado em sel
        const selectedItem = dropItens.find(item => Object.keys(item)[0] === name);
        if (!selectedItem) return; // Sai da função se o item não for encontrado

        // Atualiza o estado send com base no item selecionado
        const updatedSend = { ...send };        
        const value_list = value.split(',');
        let objeto = {};


        selectedItem[name].forEach(obj => {
            const keys = Object.keys(obj);
            keys.forEach((k, i) => {
                objeto[k] = value_list[i];
            });
        });
        const updatedState = { ...updatedSend, ...objeto };
        setSend(updatedState);
    };

    const handleDelete = async() => {
        // Aqui você pode enviar o objeto `send` para deletar da base de dados
        console.log("Deletando da base de dados:", send, url.deletar);
        await h_api({ method: 'POST', url: deletar, body: send });
        // Fechar o modal após a exclusão
        close();
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        await h_api({ method: 'POST', url: editar, body: send });
        console.log("Enviando para a API para editar:", send, url.editar);
        // Fechar o modal após a edição
        close();
    };

    return (
        <Modal show={open} onHide={close}>
            <Modal.Header closeButton>
                <Modal.Title>Atualizar ou deletar</Modal.Title>
            </Modal.Header>
            <Modal.Body>
                <form onSubmit={handleSubmit}>
                    {dropItens && <Selects dropItens={Object.values(dropItens)} row={data} handleSelectChange={handleSelectChange} />}
                    {exibir.map((atribute, index) => (
                        <div key={index}>
                            <Form.Label htmlFor={atribute}>{atribute}</Form.Label>
                            <Form.Control
                                type="text"
                                id={atribute}
                                name={atribute}
                                value={send[atribute] || ''}
                                onChange={handleInputChange}
                            />
                        </div>
                    ))}
                </form>
            </Modal.Body>
            <Modal.Footer>
                <Button variant="danger" onClick={handleDelete}>
                    Deletar
                </Button>
                <Button variant="primary" onClick={handleSubmit}>
                    Salvar Alterações
                </Button>
            </Modal.Footer>
        </Modal>
    );
}