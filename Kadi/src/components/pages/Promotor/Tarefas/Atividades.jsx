import React, { useEffect, useState } from 'react';
import { Accordion, Button, Form, Modal } from 'react-bootstrap/';

import backUrl from '../../../../../config';
import h_api from "../../../../hook/HApi";



export default function Atividades({ id_agenda, loja, mostrarCamera }) {
    const urlAtividades = backUrl + 'pro/roteiro/atividades';
    const [atividade, setAtividade] = useState(null);
    const reqAtv = {
        method: 'GET',
        url: urlAtividades,
    }
    const reqAtividades = async () => {
        setAtividade(null);
        await h_api(reqAtv, setAtividade);
    };
    useEffect(() => {
        reqAtividades();
    }, [urlAtividades, id_agenda]);
    console.log(atividade);
    return (
        <>
            <Accordion>
                <Accordion.Item eventKey="0">
                    <Accordion.Header>Loja: {loja}</Accordion.Header>
                    <Accordion.Body>
                        {atividade && atividade.map((a) => {
                            return (
                                <div key={a.id_atividade}>
                                    <Accordion>
                                        <Accordion.Item eventKey="0">
                                            <Accordion.Header>{a.descricao}</Accordion.Header>
                                            <Accordion.Body>
                                                <p>{a.observacao}</p>
                        
                                                <Button onClick={() => { mostrarCamera(id_agenda, null, a.id_atividade) }}>
                                                    Registrar Atividade
                                                </Button>
                                            </Accordion.Body>
                                        </Accordion.Item>
                                    </Accordion>
                                </div>
                            )
                        })}
                    </Accordion.Body>
                </Accordion.Item>
            </Accordion>
        </>
    );
}
