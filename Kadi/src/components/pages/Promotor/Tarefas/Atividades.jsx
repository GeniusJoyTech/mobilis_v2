import React, { useEffect, useState } from 'react';
import { Accordion, Button } from 'react-bootstrap/';

import backUrl from '../../../../../config';
import h_api from "../../../../hook/HApi";

import '../promotor.css'



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
    return (
        <>
            <Accordion>
                <Accordion.Item eventKey="0">
                    <Accordion.Header><p className='label' >Loja: {loja}</p></Accordion.Header>
                    <Accordion.Body>
                        {atividade && atividade.map((a) => {
                            return (
                                <div key={a.id_atividade}>
                                    <Accordion>
                                        <Accordion.Item eventKey="0">
                                            <Accordion.Header><p className='label' >{a.descricao}</p></Accordion.Header>
                                            <Accordion.Body>
                                                <p className='label2'>{a.observacao}</p>
                        
                                                <Button className='label2' onClick={() => { mostrarCamera(id_agenda, null, a.id_atividade) }}>
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
