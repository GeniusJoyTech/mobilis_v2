import React, { useState, useEffect } from 'react';
import { Accordion, Button, Form, Modal } from 'react-bootstrap/';

import backUrl from '../../../../../config';
import h_api from "../../../../hook/HApi";

export default function Roteiro() {
    const hoje = new Date().toISOString().split('T')[0];
    const hojeObj = new Date();
    console.log(hojeObj);
    const amanhaObj = new Date(hojeObj);
    amanhaObj.setDate(hojeObj.getDate() + 1);
    const ontemObj = new Date(hojeObj);
    ontemObj.setDate(hojeObj.getDate() - 1);

    const [proLojas, setProLojas] = useState(null);
    const [date, setdate] = useState(hoje);
    const [dataMais, setDataMais] = useState(amanhaObj);
    const [dataMenos, setDataMenos] = useState(ontemObj);


    const url = backUrl + 'pro/roteiro/ver';


    const reqPL = {
        method: 'POST',
        url: url,
        body: { date },
    }

    const reqProLoja = async () => {
        setProLojas(null);
        await h_api(reqPL, setProLojas);
    };

    useEffect(() => {
        reqProLoja();
    }, [url, date]);


    const adicionarDias = () => {
        const dataAtual = new Date(date);
        dataAtual.setDate(dataAtual.getDate() + 1);
        setdate(dataAtual.toISOString().split('T')[0]);

        const novaDataMais = new Date(dataMais);
        novaDataMais.setDate(novaDataMais.getDate() + 1);
        setDataMais(novaDataMais);

        const novaDataMenos = new Date(dataMenos);
        novaDataMenos.setDate(novaDataMenos.getDate() + 1);
        setDataMenos(novaDataMenos);

    };


    const subtrairDias = () => {
        const dataAtual = new Date(date);
        dataAtual.setDate(dataAtual.getDate() - 1);
        setdate(dataAtual.toISOString().split('T')[0]);

        const novaDataMais = new Date(dataMais);
        novaDataMais.setDate(novaDataMais.getDate() - 1);
        setDataMais(novaDataMais);

        const novaDataMenos = new Date(dataMenos);
        novaDataMenos.setDate(novaDataMenos.getDate() - 1);
        setDataMenos(novaDataMenos);

    };

    const configurarHoje = () => {
        setdate(hoje);
    };


    return (
        <>

            <h1>Roteiro</h1>
            <div style={{ display: 'flex', justifyContent: 'space-around' }}>
                <Button variant="secondary" onClick={subtrairDias}>{dataMenos.toISOString().split('T')[0]}</Button>

                <Button variant="light" onClick={configurarHoje}>{date}</Button>

                <Button variant="secondary" onClick={adicionarDias}>{dataMais.toISOString().split('T')[0]}</Button>
            </div>
            <Accordion defaultActiveKey="0">
                <Accordion.Item eventKey="0">
                    <Accordion.Header>Abertas</Accordion.Header>
                    <Accordion.Body>
                        {proLojas && proLojas.map((lojas) => {
                            return (
                                <Lojas
                                    key={lojas.id_loja}
                                    id_loja={lojas.id_loja}
                                    loja={lojas.loja}
                                    endereco={lojas.endereco}
                                    cep={lojas.cep}
                                />
                            )
                        })}
                    </Accordion.Body>
                </Accordion.Item>
                <Accordion.Item eventKey="1">
                    <Accordion.Header>Concluídas</Accordion.Header>
                    <Accordion.Body>
                        <ul>
                            <li>Aqui eu devo exibir as lojas do dia que já foram realizadas.</li>
                            <li>Deve aparecer o nome da loja, o endereço.</li>
                            <li>Quando clicar na loja deve aparecer </li>
                        </ul>
                    </Accordion.Body>
                </Accordion.Item>
            </Accordion>


        </>
    );
}

function Lojas({ id_loja, loja, endereco, cep }) {
    const [showJust, setShowJust] = useState(false);
    
    const [showEntrada, setShowEntrada] = useState(false);
    const handleClose = () => setShowJust(false);

    
    const handleShow = () => setShowJust(true);

    



    return (
        <>
            <Accordion>
                <Accordion.Item eventKey="0">
                    <Accordion.Header>Loja: {loja}</Accordion.Header>
                    <Accordion.Body>
                        <div>
                            <p>Endereço: {endereco}</p>
                            <p>Cep: {cep}</p>
                        </div>
                        <div style={{ border: '1px solid', borderRadius: '1px', margin: '2px' }}></div>
                        <div style={{ display: 'flex' }}>
                            <Button style={{ marginRight: '2px' }} onClick={handleShow}>
                                Justificar
                            </Button>
                            <Button>
                                Entrada
                            </Button>
                        </div>
                        {/* 
                        <Modal show={showJust} onHide={handleClose}>
                            <Modal.Header closeButton>
                                <Modal.Title>Justificativa</Modal.Title>
                            </Modal.Header>
                            <Modal.Body>
                                <Form>
                                    <Form.Group className="mb-3" controlId="exampleForm.ControlTextarea1">
                                        <Form.Label>Por que você não irá atender a loja de id= {id_loja}?</Form.Label>
                                        <Form.Control as="textarea" rows={3} value={justificativa} onChange={(e) => setJustificativa(e.target.value)} />
                                    </Form.Group>
                                    <Form.Group controlId="formFile" className="mb-3">
                                        <Form.Label>Imagem de justificativa</Form.Label>
                                        <Form.Control type="file" accept='image/*' onChange={handleImageChange} />
                                    </Form.Group>
                                </Form>
                            </Modal.Body>
                            <Modal.Footer>
                                <Button variant="secondary" onClick={handleClose}>
                                    Fechar
                                </Button>
                                <Button variant="primary" onClick={handleSave}>
                                    Salvar
                                </Button>
                            </Modal.Footer>
                        </Modal> */}
                        <Justificativa
                            showJust={showJust}
                            handleClose={handleClose}
                            id_loja={id_loja}
                        />
                        {/* <ul>
                            <li>Caso realize as ATIVIDADES aparecerá as atividades que o promotor deve realizar na loja.</li>
                            <li>Após escolher a loja deverá abrir a tela de atividades da loja e exibir as atividades da loja para o promotor realizar.</li>
                        </ul> */}
                    </Accordion.Body>
                </Accordion.Item>
            </Accordion>
        </>
    );
}

function Justificativa({showJust, handleClose, id_loja}) {
    const [justificativa, setJustificativa] = useState('');
    const [imagemBase64, setImagemBase64] = useState('');
    const handleSave = async () => {
        // Aqui você pode enviar a justificativa e a imagem base64 para onde precisar, como um servidor ou um estado do componente pai

        const send = {
            datahora: new Date(),
            foto: imagemBase64,
            observacao: justificativa,
            id_loja: id_loja
        }

        const req = {
            method: 'POST',
            url: backUrl + 'pro/justificativa/incluir',
            body: send,
        }
        console.log(send);
        await h_api(req);

        // Feche o modal
        handleClose();
    };
    const resizeImage = (file, maxWidth, maxHeight) => {
        return new Promise((resolve, reject) => {
            const reader = new FileReader();
            reader.readAsDataURL(file);
            reader.onload = (event) => {
                const img = new Image();
                img.src = event.target.result;
                img.onload = () => {
                    const canvas = document.createElement('canvas');
                    let width = img.width;
                    let height = img.height;

                    // Redimensionar a imagem mantendo a proporção
                    if (width > height) {
                        if (width > maxWidth) {
                            height *= maxWidth / width;
                            width = maxWidth;
                        }
                    } else {
                        if (height > maxHeight) {
                            width *= maxHeight / height;
                            height = maxHeight;
                        }
                    }

                    canvas.width = width;
                    canvas.height = height;

                    const ctx = canvas.getContext('2d');
                    ctx.drawImage(img, 0, 0, width, height);

                    // Converta o canvas para base64
                    const resizedBase64 = canvas.toDataURL('image/jpeg');
                    resolve(resizedBase64);
                };
            };
            reader.onerror = error => reject(error);
        });
    };
    const handleImageChange = async (event) => {
        const file = event.target.files[0];
        if (file) {
            // Redimensionar a imagem para um tamanho máximo de 800x600 antes de enviar
            const resizedBase64 = await resizeImage(file, 800, 600);
            if (resizedBase64) {
                setImagemBase64(resizedBase64);
            } else {
                console.error('Erro ao redimensionar a imagem.');
            }
        }
    };

    return(<Modal show={showJust} onHide={handleClose}>
        <Modal.Header closeButton>
            <Modal.Title>Justificativa</Modal.Title>
        </Modal.Header>
        <Modal.Body>
            <Form>
                <Form.Group className="mb-3" controlId="exampleForm.ControlTextarea1">
                    <Form.Label>Por que você não irá atender a loja de id= {id_loja}?</Form.Label>
                    <Form.Control as="textarea" rows={3} value={justificativa} onChange={(e) => setJustificativa(e.target.value)} />
                </Form.Group>
                <Form.Group controlId="formFile" className="mb-3">
                    <Form.Label>Imagem de justificativa</Form.Label>
                    <Form.Control type="file" accept='image/*' onChange={handleImageChange} />
                </Form.Group>
            </Form>
        </Modal.Body>
        <Modal.Footer>
            <Button variant="secondary" onClick={handleClose}>
                Fechar
            </Button>
            <Button variant="primary" onClick={handleSave}>
                Salvar
            </Button>
        </Modal.Footer>
    </Modal>)
}