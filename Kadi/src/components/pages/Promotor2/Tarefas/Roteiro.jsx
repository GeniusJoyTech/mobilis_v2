import React, { useState, useEffect } from 'react';
import { Accordion, Button } from 'react-bootstrap/';

import Lojas from './Lojas';
import Camera from './Camera';

import backUrl from '../../../../../config';
import h_api from "../../../../hook/HApi";


export default function Roteiro() {
    const hoje = new Date().toISOString().split('T')[0];
    const hojeObj = new Date();
    const amanhaObj = new Date(hojeObj);
    amanhaObj.setDate(hojeObj.getDate() + 1);
    const ontemObj = new Date(hojeObj);
    ontemObj.setDate(hojeObj.getDate() - 1);

    const [proLojas, setProLojas] = useState(null);
    const [date, setdate] = useState(hoje);
    const [dataMais, setDataMais] = useState(amanhaObj);
    const [dataMenos, setDataMenos] = useState(ontemObj);


    const [showCamera, setShowCamera] = useState(false);
    const [showTarefas, setShowTarefas] = useState(true);
    const [send, setSend] = useState({});

    function mostrarCamera(id_agenda, id_atividade) {
        setShowTarefas(false);
        setShowCamera(true);
        setSend({ id_agenda: id_agenda, id_atividade: id_atividade });

    }
    const fecharCamera = () => {
        setShowCamera(false);
        setShowTarefas(true);
        setSend({});
    };
    const enviarFoto = async (foto) => {
        setShowCamera(false);
        setShowTarefas(true);
        let dataFormatada = `${hojeObj.getFullYear()}-${(hojeObj.getMonth() + 1).toString().padStart(2, '0')}-${hojeObj.getDate().toString().padStart(2, '0')} ${hojeObj.getHours().toString().padStart(2, '0')}:${hojeObj.getMinutes().toString().padStart(2, '0')}:${hojeObj.getSeconds().toString().padStart(2, '0')}`;
        let incluirFoto = {
            method: 'POST',
            url: backUrl + 'pro/foto/incluir',
            body: { ...send, foto: foto, data: dataFormatada },
        }
        await h_api(incluirFoto);
    };



    const url = backUrl + 'pro/roteiro/ver';

    useEffect(() => {
        console.log(send);
    }, [send]);


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

            {showTarefas &&
                (
                    <>

                        <h1>Roteiro</h1>
                        {/* Data */}
                        <Dia/>
                        <div style={{ display: 'flex', justifyContent: 'space-around' }}>
                            <Button variant="secondary" onClick={subtrairDias}>{dataMenos.toISOString().split('T')[0]}</Button>

                            <Button variant="light" onClick={configurarHoje}>{date}</Button>

                            <Button variant="secondary" onClick={adicionarDias}>{dataMais.toISOString().split('T')[0]}</Button>
                        </div>
                        {/* Tarefas do dia */}
                        <Accordion defaultActiveKey="0">
                            <Accordion.Item eventKey="0">
                                <Accordion.Header>Abertas</Accordion.Header>
                                <Accordion.Body>
                                    {proLojas && proLojas.map((lojas) => {
                                        return (
                                            <Lojas
                                                key={lojas.id_agenda}
                                                id_agenda={lojas.id_agenda}
                                                loja={lojas.loja}
                                                endereco={lojas.endereco}
                                                cep={lojas.cep}
                                                mostrarCamera={mostrarCamera}
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
                )}

            {showCamera && <Camera fechar={fecharCamera} enviarFoto={enviarFoto} />}
        </>
    );
}

function Dia() {
    const hoje = new Date().toISOString().split('T')[0];
    const hojeObj = new Date();
    const amanhaObj = new Date(hojeObj);
    amanhaObj.setDate(hojeObj.getDate() + 1);
    const ontemObj = new Date(hojeObj);
    ontemObj.setDate(hojeObj.getDate() - 1);

    const [date, setdate] = useState(hoje);
    const [dataMais, setDataMais] = useState(amanhaObj);
    const [dataMenos, setDataMenos] = useState(ontemObj);

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
        <div style={{ display: 'flex', justifyContent: 'space-around' }}>
            <Button variant="secondary" onClick={subtrairDias}>{dataMenos.toISOString().split('T')[0]}</Button>

            <Button variant="light" onClick={configurarHoje}>{date}</Button>

            <Button variant="secondary" onClick={adicionarDias}>{dataMais.toISOString().split('T')[0]}</Button>
        </div>

    )
}