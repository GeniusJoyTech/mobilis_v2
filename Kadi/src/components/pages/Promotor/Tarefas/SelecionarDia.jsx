import React, { useState, useEffect } from 'react';
import { Button } from 'react-bootstrap/';

export default function Dia({hoje, date, setDate}) {
    const hojeObj = new Date();
    const amanhaObj = new Date(hojeObj);
    const ontemObj = new Date(hojeObj);
    
    amanhaObj.setDate(hojeObj.getDate() + 1);
    ontemObj.setDate(hojeObj.getDate() - 1);

    //const [date, setDate] = useState(hoje);
    const [dataMais, setDataMais] = useState(amanhaObj);
    const [dataMenos, setDataMenos] = useState(ontemObj);
    

    const adicionarDias = () => {
        const dataAtual = new Date(date);
        dataAtual.setDate(dataAtual.getDate() + 1);
        setDate(dataAtual.toISOString().split('T')[0]); 

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
        setDate(dataAtual.toISOString().split('T')[0]);

        const novaDataMais = new Date(dataMais);
        novaDataMais.setDate(novaDataMais.getDate() - 1);
        setDataMais(novaDataMais);

        const novaDataMenos = new Date(dataMenos);
        novaDataMenos.setDate(novaDataMenos.getDate() - 1);
        setDataMenos(novaDataMenos);

    };

    const configurarHoje = () => {
        setDate(hoje);
    };


    return (
        <div style={{ display: 'flex', justifyContent: 'space-around', marginBottom: '8px' }}>
            <Button variant="secondary" onClick={subtrairDias}>{dataMenos.toISOString().split('T')[0]}</Button>

            <Button variant="light" onClick={configurarHoje}>{date}</Button>

            <Button variant="secondary" onClick={adicionarDias}>{dataMais.toISOString().split('T')[0]}</Button>
        </div>

    )
}