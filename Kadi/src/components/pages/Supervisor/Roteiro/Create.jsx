import { useState } from "react";
import Modal from 'react-bootstrap/Modal';
import Button from 'react-bootstrap/Button';
import Selects from "./details/Selects";
import Form from 'react-bootstrap/Form';

import h_api from '../../../../hook/HApi';

export default function UpdateDelete({open, close, exibir, dropItens, url }) {
    const [send, setSend] = useState({}); // Inicialize send como um objeto vazio

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
 

    const handleSubmit = async(e) => {
        e.preventDefault();
        // Aqui você pode enviar o objeto `send` para atualizar/editar na base de dados
        await h_api({ method: 'POST', url: url, body: send });
        console.log("Enviando para a API nova tupla:", send, url);
        close();
    };

    return (
        <Modal show={open} onHide={close}>
            <Modal.Header closeButton>
                <Modal.Title>Adicionar</Modal.Title>
            </Modal.Header>
            <Modal.Body>
                <form onSubmit={handleSubmit}>
                    {/* Incorporando os selects */}
                    {dropItens && <Selects dropItens={Object.values(dropItens)} handleSelectChange={handleSelectChange} />}
                    {/* Inputs para outros dados */}
                    {exibir.map((atribute, index) => (
                        <div key={index}>
                            <Form.Label htmlFor={atribute}>{atribute}</Form.Label>
                            <Form.Control
                                type="text"
                                id={atribute}
                                name={atribute}
                                onChange={handleInputChange}
                            />
                        </div>
                    ))}
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
