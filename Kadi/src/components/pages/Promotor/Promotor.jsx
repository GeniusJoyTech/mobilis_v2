import { useEffect, useState } from "react";
import h_api from "../../../hook/HApi";

import Lojas from './Lojas.jsx'

import backUrl from '../../../../config.js'

import { DateControls } from "../../crud/details/Data.jsx";
export default function Promotor() {
    const [intervalo, setIntervalo] = useState({});
    const [proLojas, setProLojas] = useState([])
    const [loading, setLoading] = useState(false);
    const url = backUrl+'pro/roteiro/ver';
    const reqPL = {
        method: 'POST',
        url: url,
        body: { cracha: 'P02', date: '2024-05-03' },
    }
    const reqProLoja = async () => {
        setLoading(true);
        await h_api(reqPL, setProLojas);
        setLoading(false);
    };
    useEffect(() => {
        reqProLoja();
    }, [url]);
    console.log(proLojas);
    const handleIntervaloChange = (novoIntervalo) => {
        setIntervalo(novoIntervalo);
    };
        return (
        <>
            {
                loading ? (

                    <p>Carregando...</p>
                )
                    :
                    <div style={{ border: '20px solid rgba(0,0,0,0)', borderRadius: '4px' }}>
                        <DateControls onIntervaloChange={handleIntervaloChange} />
                        
                        <Lojas lojas={proLojas} />
                    </div>
            }
        </>
    );
}