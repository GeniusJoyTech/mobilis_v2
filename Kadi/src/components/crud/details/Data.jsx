import { useEffect, useState } from "react";
import { Button } from "react-bootstrap/esm";
import obterData from '../../../utils/obterData.js';

export function DateControls() {
    const [intervalo, setIntervalo] = useState(0); // objeto que contém {dia, mes, ano} recebe o intervalo da funcao obter data
    const [data, setData] = useState(0); // valor inteiro que será passado para a função obter data

    
    useEffect(() => {
        setIntervalo(obterData(data));
    }, [data]);

    const handleDiaMaisUm = () => {
        setData(data + 1);
        setIntervalo(obterData(data));
    }

    const handleDiaMenosUm = () => {
        setData(data - 1);
    }
    const handleHoje = () => {
        setData(0);
    }
    return (
        <div style={{ display: 'flex' }}>
            <Button onClick={handleDiaMenosUm}>Voltar</Button>
            <p>{intervalo.dia}/{intervalo.mes}/{intervalo.ano}</p>
            <Button onClick={handleDiaMaisUm}>Avançar</Button>
            <Button onClick={handleHoje}>Hoje</Button>
        </div>
    );
}
