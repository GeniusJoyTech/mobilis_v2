import React, { useEffect, useState } from "react";
import Modal from 'react-bootstrap/Modal';
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';

import h_api from '../../../../hook/HApi';

export default function Update({ open, close, data, dropItens, url }) {
    const func = dropItens
        .filter(objeto => objeto.hasOwnProperty("funcionario"))
        .map(objeto => objeto["funcionario"]);;
    const loja = dropItens
        .filter(objeto => objeto.hasOwnProperty("loja"))
        .map(objeto => objeto["loja"]);;
    const atividades = dropItens
        .filter(objeto => objeto.hasOwnProperty("atividade"))
        .map(objeto => objeto["atividade"]);;


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
    // const handleSelectChange = (e) => {
    //     const { name, value } = e.target;
    //     console.log(name, value);
    //     // Busca o item selecionado em sel
    //     const selectedItem = dropItens.find(item => Object.keys(item)[0] === name);
    //     if (!selectedItem) return; // Sai da função se o item não for encontrado

    //     // Atualiza o estado send com base no item selecionado
    //     const updatedSend = { ...send };
    //     const value_list = value.split(',');
    //     let objeto = {};


    //     selectedItem[name].forEach(obj => {
    //         const keys = Object.keys(obj);
    //         keys.forEach((k, i) => {
    //             objeto[k] = value_list[i];
    //         });
    //     });
    //     const updatedState = { ...updatedSend, ...objeto };
    //     setSend(updatedState);
    // };

    const handleSelectChange = (e) => {
        const { name, value } = e.target;
        console.log(name, value);
    
        // Busca o item selecionado diretamente em data
        const selectedItem = data[name];
        if (!selectedItem) {
            console.log('Item não encontrado em data');
            return;
        }
    
        // Atualiza o estado send com base no item selecionado
        setSend(prevSend => {
            const updatedSend = { ...prevSend };
    
            // Atualiza o objeto send com a nova chave e valor
            updatedSend[name] = value;
    
            console.log(updatedSend); // O estado atualizado está disponível aqui
            return updatedSend;
        });
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
                <Modal.Title>Atualizar</Modal.Title>
            </Modal.Header>
            <Modal.Body>
                <form onSubmit={handleSubmit}>

                    <Form.Label htmlFor='funcionario'>Funcionário</Form.Label>
                    <Form.Select id={'funcionario'} name={'id_usuario'} onChange={handleSelectChange}>
                        <option key={data.id_usuario} value={data.id_usuario}>usuário atual: {data.id_usuario} - {data.nome}</option>

                        {func[0] && func[0].map((f, index) => (
                            <option key={index} value={f.id_usuario}>{f.id_usuario} {f.nome}</option>
                        ))}
                    </Form.Select>


                    <Form.Label htmlFor='loja'>Loja</Form.Label>
                    <Form.Select id={'loja'} name={'id_loja'} onChange={handleSelectChange}>
                        <option key='lj' value={data.id_loja}>Loja atual: {data.loja} - {data.rua} {data.numero}</option>

                        {loja[0] && loja[0].map((l, index) => (
                            <option key={'l ' + index} value={l.id_loja}>{l.id_loja} {l.loja} - {l.cidade}, {l.rua} {l.numero}</option>
                        ))}
                    </Form.Select>

                    <Form.Label htmlFor='atividade'>Atividade</Form.Label>
                    <Form.Select id={'Atividade'} name={'id_atividade'} onChange={handleSelectChange}>
                        <option key='at' value={data.id_atividade}>atividade atual: {data.descricao}</option>

                        {atividades[0] && atividades[0].map((a, index) => (
                            <option key={'a ' + index} value={a.id_atividade}>{a.descricao} - {a.observacao}</option>
                        ))}
                    </Form.Select>


                    <Form.Label htmlFor={'ciclo'}>Ciclo</Form.Label>
                    <Form.Control
                        type="number"
                        id='ciclo'
                        name='ciclo'
                        value={send.ciclo || ''}
                        onChange={handleInputChange}
                    />

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
                <Button variant="primary" onClick={handleSubmit}>
                    Salvar Alterações
                </Button>
                <Button variant="primary" onClick={handleClose}>
                    Cancelar
                </Button>
            </Modal.Footer>
        </Modal>
    );
}
