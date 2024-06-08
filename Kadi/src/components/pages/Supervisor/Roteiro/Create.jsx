import { useEffect, useState } from "react";
import Modal from 'react-bootstrap/Modal';
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import h_api from '../../../../hook/HApi';

export default function UpdateDelete({ open, close, promotores, lojas, url }) {
    const [send, setSend] = useState({}); 
    const [enviando, setEnviando] = useState(false);

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
        if (!send.id_loja) {
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
        await h_api({ method: 'POST', url: url, body: send });
        close();
        setSend({});
        setEnviando(false);
    };

    return (
        <Modal show={open} onHide={close}>
            <Modal.Header closeButton>
                <Modal.Title>Adicionar</Modal.Title>
            </Modal.Header>
            <Modal.Body>
                <form onSubmit={handleSubmit}>
                    <Form.Label htmlFor={'id_usuario'}>Promotores</Form.Label>
                    <Form.Select id={'id_usuario'} name={'id_usuario'} onChange={handleSelectChange}>
                        <option key={`A`} value="">Selecione um Promotor</option>
                        {promotores && promotores.map((p, index) => (
                            <option key={index} value={p.id_usuario}>{p.nome} - {p.status} - {p.cracha}</option>
                        ))}
                    </Form.Select>
                    
                    <Form.Label htmlFor={'id_loja'}>Lojas</Form.Label>
                    <Form.Select id={'id_loja'} name={'id_loja'} onChange={handleSelectChange}>
                        <option key={`B`} value="">Selecione uma Loja</option>
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
                            value='1'
                            checked={send['ciclo'] === '1'}
                            onChange={handleInputChange}
                        />
                        <Form.Check
                            inline
                            type='radio'
                            id='duasSemanas'
                            name='ciclo'
                            label='duas semanas'
                            value='2'
                            checked={send['ciclo'] === '2'}
                            onChange={handleInputChange}
                        /><br />
                        <Form.Check
                            inline
                            type='radio'
                            id='tresSemanas'
                            name='ciclo'
                            label='três semanas'
                            value='3'
                            checked={send['ciclo'] === '3'}
                            onChange={handleInputChange}
                        />
                        <Form.Check
                            inline
                            type='radio'
                            id='quatroSemanas'
                            name='ciclo'
                            label='quatro semanas'
                            value='4'
                            checked={send['ciclo'] === '4'}
                            onChange={handleInputChange}
                        />
                    </div>

                    <Form.Label htmlFor={'diavisita'}>Data da primeira visita</Form.Label>
                    <Form.Control
                        type="date"
                        id='diavisita'
                        name='diavisita'
                        value={send['diavisita'] || ''}
                        onChange={handleInputChange}
                    />
                </form>
            </Modal.Body>
            <Modal.Footer>
                <Button variant="secondary" onClick={close}>
                    Cancelar
                </Button>
                <Button variant="primary" type="submit" onClick={handleSubmit} disabled={enviando}>
                    Salvar Alterações
                </Button>
            </Modal.Footer>
        </Modal>
    );
}
