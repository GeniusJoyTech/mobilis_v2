import { useState, useEffect } from "react";
import Modal from 'react-bootstrap/Modal';
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import buscarCEP from '../../../../utils/buscaCep'
import h_api from "../../../../hook/HApi";
import backUrl from '../../../../../config'
export default function CreatePromotores({ open, close, url }) {
    const [send, setSend] = useState({}); // Inicialize send como um objeto vazio
    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setSend(prevSend => ({
            ...prevSend,
            [name]: value
        }));
    };
    ////
    const [sup, setSup] = useState();

    useEffect(() => {
        async function getSup() {
            const reqSup = {
                method: 'GET',
                url: backUrl+'sup/sup/ver',
            };

            await h_api(reqSup, setSup);

        }
        getSup();
    }, []);

    ////
    const handleSubmit = async (e) => {
        e.preventDefault();
        
        console.log("Enviando para a API nova tupla:", send, url);
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
                    
                    <Form.Label htmlFor="id_superior">superior</Form.Label>
                    <Form.Select
                        aria-label="Default select example"
                        id='id_superior'
                        name='id_superior'
                        onChange={handleInputChange}
                    >
                        <option value=''>Selecione um superior</option>
                        {sup && sup.map(supervisor => (
                            <option key={supervisor.id_usuario} value={supervisor.id_usuario}>
                                {supervisor.nome}
                            </option>
                        ))}
                    </Form.Select>
                    <Form.Label htmlFor="status">Status</Form.Label>
                    <Form.Control type='text'
                        id='status'
                        name='status'
                        value={send['status'] || ''}
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
