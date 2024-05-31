import React, { useState, useEffect } from 'react';
import { Accordion } from 'react-bootstrap/';

import Dia from './SelecionarDia';
import Lojas from './Lojas';
import Atividades from './Atividades';
import Concluidas from './Concluidas';
import Camera from './Camera';

import CustomToast from '../../../../hook/CustomToast';

import '../promotor.css';

import backUrl from '../../../../../config';
import h_api from "../../../../hook/HApi";


export default function Roteiro({ setId_loja }) {
    const hoje = new Date().toLocaleDateString('en-Ca');
    const [date, setDate] = useState(hoje);

    const [lojasPendentes, setPendentes] = useState(null);
    const [lojasAndamento, setAndamento] = useState(null);
    const [lojasConcluida, setConcluida] = useState(null);
    const [showCamera, setShowCamera] = useState(false);
    const [showLojas, setShowLojas] = useState(true);
    const [send, setSend] = useState({});
    const [showToast, setShowToast] = useState(false);
    const [toastMessage, setToastMessage] = useState('');


    const urlPendentes = backUrl + 'pro/roteiro/pendentes';
    const urlAndamento = backUrl + 'pro/roteiro/andamento';
    const urlConcluida = backUrl + 'pro/roteiro/concluida';



    const reqPen = {
        method: 'POST',
        url: urlPendentes,
        body: { date },
    }

    const reqAnd = {
        method: 'POST',
        url: urlAndamento,
        body: { date },
    }

    const reqCon = {
        method: 'POST',
        url: urlConcluida,
        body: { date },
    }

    const reqPendentes = async () => {
        setShowToast(true);
        setToastMessage("Obtendo dados do sistema.");
        setPendentes(null);
        await h_api(reqPen, setPendentes);
    };

    useEffect(() => {
        reqPendentes();
    }, [urlPendentes, date]);

    const reqAndamento = async () => {
        setAndamento(null);
        await h_api(reqAnd, setAndamento);
    };

    useEffect(() => {
        reqAndamento();
    }, [urlAndamento, date]);

    const reqConcluida = async () => {
        setConcluida(null);
        await h_api(reqCon, setConcluida);
    };

    useEffect(() => {
        reqConcluida();
    }, [urlConcluida, date]);



    function mostrarCamera(id_agenda, id_loja, id_atividade) {
        setShowLojas(false);
        setShowCamera(true);
        setSend({ id_agenda: id_agenda, id_loja: id_loja, id_atividade: id_atividade });

    }
    const fecharCamera = () => {
        setShowCamera(false);
        setShowLojas(true);
        setSend({});
    };

    const enviarFoto = async (foto) => {
        let hojeObj =  new Date().toLocaleDateString('en-CA');
        let incluirFoto = {
            method: 'POST',
            url: backUrl + 'pro/foto/incluir',
            body: { ...send, foto: foto, data: hojeObj },
        }

        setShowCamera(false);
        setShowLojas(true);
        await h_api(incluirFoto);

        setId_loja(send.id_loja);
        setSend({});
        reqAndamento();
        reqPendentes();
        reqConcluida();
    };









    return (
        <>

            {showLojas &&
                (
                    <>

                        <h1 className='label'>Roteiro</h1>
                        {/* Data */}
                        <Dia hoje={hoje} date={date} setDate={setDate} />

                        {/* Tarefas do dia */}
                        <Accordion defaultActiveKey="0">
                            <Accordion.Item eventKey="0">
                                <Accordion.Header ><p className='label' >Pendentes</p></Accordion.Header>
                                <Accordion.Body>
                                    {lojasPendentes && lojasPendentes.map((lojas) => {
                                        return (
                                            <Lojas
                                                key={lojas.id_agenda}
                                                id_agenda={lojas.id_agenda}
                                                id_loja={lojas.id_loja}
                                                loja={lojas.loja}
                                                endereco={lojas.endereco}
                                                cep={lojas.cep}
                                                mostrarCamera={mostrarCamera}
                                            />
                                        )
                                    })}
                                </Accordion.Body>
                            </Accordion.Item>
                            {/* acordion em andamento. */}
                            <Accordion.Item eventKey="1">
                                <Accordion.Header><p className='label' >Andamento</p></Accordion.Header>
                                <Accordion.Body>
                                    <ul>
                                        {lojasAndamento && lojasAndamento.map((lojas) => {
                                            return (
                                                <Atividades
                                                    key={lojas.id_agenda}
                                                    id_agenda={lojas.id_agenda}
                                                    id_loja={lojas.id_loja}
                                                    loja={lojas.loja}
                                                    mostrarCamera={mostrarCamera}
                                                />
                                            )
                                        })}
                                    </ul>
                                </Accordion.Body>
                            </Accordion.Item>
                            {/* acordion Concluidas. */}
                            <Accordion.Item eventKey="2">
                                <Accordion.Header><p className='label'>Concluída</p>
                                </Accordion.Header>
                                <Accordion.Body>
                                    <ul>
                                        {lojasConcluida && lojasConcluida.map((lojas) => {
                                            return (
                                                <Concluidas
                                                    key={lojas.id_agenda}
                                                    id_agenda={lojas.id_agenda}
                                                    id_loja={lojas.id_loja}
                                                    loja={lojas.loja}
                                                    endereco={lojas.endereco}
                                                    cep={lojas.cep}
                                                    mostrarCamera={mostrarCamera}
                                                />
                                            )
                                        })}
                                    </ul>
                                </Accordion.Body>
                            </Accordion.Item>

                        </Accordion>
                                        

                    </>
                )}
            <CustomToast showToast={showToast} setShowToast={setShowToast} delay={1500} toastMessage={toastMessage} toastTitulo={"Informações."}/>
            {showCamera && <Camera fechar={fecharCamera} enviarFoto={enviarFoto} />}
        </>
    );
}
