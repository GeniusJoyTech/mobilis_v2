import React, { useState} from 'react';
import { Accordion, Button, Form, Modal } from 'react-bootstrap/';

import backUrl from '../../../../../config';
import h_api from "../../../../hook/HApi";


import '../promotor.css';

export default function Lojas({ id_agenda, id_loja, loja, endereco, cep, mostrarCamera}) {
    const [showJust, setShowJust] = useState(false);
    const handleCloseJust = () => setShowJust(false);
    const handleShowJust = () => setShowJust(true);
    return (
        <>
            <Accordion>
                <Accordion.Item eventKey="0">
                    <Accordion.Header ><p className='label'>Loja: {loja}</p></Accordion.Header>
                    <Accordion.Body>
                        <div>
                            <p className='label2'>Endereço: {endereco}</p>
                            <p className='label2'>Cep: {cep}</p>
                        </div>
                        <div style={{ borderBottom: '1px solid', borderRadius: '1px', margin: '8px' }}></div>
                        <div style={{ display: 'flex' }}>
                            <Button className='label2' style={{ marginRight: '2px' }} onClick={handleShowJust}>
                                Justificar
                            </Button>
                            <Button className='label2' onClick={()=>{mostrarCamera(id_agenda, id_loja, 1)}}>
                                Entrada
                            </Button>
                        </div>
                        <Justificativa
                            showJust={showJust}
                            handleClose={handleCloseJust}
                            id_agenda={id_agenda}
                        />
                    </Accordion.Body>
                </Accordion.Item>
            </Accordion>
        </>
    );
}

function Justificativa({ showJust, handleClose, id_agenda }) {
    const [justificativa, setJustificativa] = useState('');
    const [imagemBase64, setImagemBase64] = useState('');
    const [enviando, setEnviando] = useState(false);
    const handleSave = async () => {
        // Aqui você pode enviar a justificativa e a imagem base64 para onde precisar, como um servidor ou um estado do componente pai
        if(justificativa.length < 10){
            alert('Por favor justifique corretamente o roteiro, adicione mais palavras.');
            return;
        }
        if(!imagemBase64){
            alert('Você precisa adicionar uma imagem!');
            return;    
        }
        setEnviando(true);
        const send = {
            datahora: new Date(),
            foto: imagemBase64,
            observacao: justificativa,
            id_agenda: id_agenda,
            id_atividade: 2
        }

        const req = {
            method: 'POST',
            url: backUrl + 'pro/justificativa/incluir',
            body: send,
        }
        await h_api(req);
        handleClose();
        setEnviando(false);
        location.reload(true);
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

    return (<Modal show={showJust} onHide={handleClose}>
        <Modal.Header closeButton>
            <Modal.Title className='label'>Justificativa</Modal.Title>
        </Modal.Header>
        <Modal.Body>
            <Form>
                <Form.Group className="mb-3" controlId="exampleForm.ControlTextarea1">
                    <Form.Label className='label2'>Por favor escreva o motivo do não atendimento.</Form.Label>
                    <Form.Control className='label2' as="textarea" rows={3} value={justificativa} onChange={(e) => setJustificativa(e.target.value)} />
                </Form.Group>
                <Form.Group controlId="formFile" className="mb-3">
                    <Form.Label className='label'>Imagem de justificativa</Form.Label>
                    <Form.Control className='label2' type="file" accept='image/*' onChange={handleImageChange} />
                </Form.Group>
            </Form>
        </Modal.Body>
        <Modal.Footer>
            <Button className='label2' variant="secondary" onClick={handleClose}>
                Fechar
            </Button>
            <Button className='label2' variant="primary" onClick={handleSave} disabled={enviando}>
                Salvar
            </Button>
        </Modal.Footer>
    </Modal>)
}