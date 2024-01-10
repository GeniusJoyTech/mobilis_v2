import React, { useState } from 'react';
import { Modal, Button, Form } from 'react-bootstrap';
import h_api from '../hook/HApi';
import refreshTime from '../utils/refreshTime';
import DropMap from './DropMapItem';

function Incluir({ show, onHide, col, lin, url }) {
    const colFil = col.filter(c => c.tipo === 'list');
    const lista = [];
    for (let cont1 = 0; cont1 < lin.length; cont1++) {
        const itens = {};
        for (let cont2 = 0; cont2 < colFil.length; cont2++) {
            let chave = colFil[cont2].nome;
            if (lin[cont1][chave] !== null && lin[cont1][chave] !== '') {
                itens[chave] = lin[cont1][chave];
            }
        }
   if (Object.keys(itens).length > 0) {
            lista.push(itens);
        }
    }
    const listaSemDupl = Array.from(new Set(lista.map(JSON.stringify))).map(JSON.parse);
    console.log(listaSemDupl);

    const [formData, setFormData] = useState({});
    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setFormData((prevData) => ({
            ...prevData,
            [name]: value,
        }));
    };

    const handleSendSubmit = async () => {
        try {
            await h_api({ method: 'POST', url: url, body: formData });
            onHide();
            refreshTime();
        } catch (error) {
            console.error("Erro ao buscar dados:", error.message);
        }
    };

    return (
        <Modal show={show} onHide={onHide}>
            <Modal.Header closeButton>
                <Modal.Title>Incluir Dados</Modal.Title>
            </Modal.Header>
            <Modal.Body>
                
                <Form>
                    {col.map((coluna) => (
                        <Form.Group key={coluna.id} controlId={`form${coluna.nome}`}>
                            <Form.Label>{coluna.nome}</Form.Label>
                            <Form.Control
                                type="text"
                                name={coluna.nome}
                                onChange={handleInputChange}
                            />
                        </Form.Group>
                    ))}
                </Form>
            </Modal.Body>
            <Modal.Footer>
                <Button variant="primary" onClick={handleSendSubmit}>
                    Salvar Alterações
                </Button>
            </Modal.Footer>
        </Modal>
    );
}

export default Incluir;
