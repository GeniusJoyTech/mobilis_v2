import React, { useState, useEffect } from 'react';
import { Button } from 'react-bootstrap/';

import backUrl from '../../../../../config';
import h_api from "../../../../hook/HApi";

export default function Dia() {
    const hoje = new Date().toISOString().split('T')[0];
    const hojeObj = new Date();
    console.log(hojeObj);
    const amanhaObj = new Date(hojeObj);
    amanhaObj.setDate(hojeObj.getDate() + 1);
    const ontemObj = new Date(hojeObj);
    ontemObj.setDate(hojeObj.getDate() - 1);

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
            {/* Data */}
            <div style={{ display: 'flex', justifyContent: 'space-around' }}>
                <Button variant="secondary" onClick={subtrairDias}>{dataMenos.toISOString().split('T')[0]}</Button>

                <Button variant="light" onClick={configurarHoje}>{date}</Button>

                <Button variant="secondary" onClick={adicionarDias}>{dataMais.toISOString().split('T')[0]}</Button>
            </div>
   </>
    )
}