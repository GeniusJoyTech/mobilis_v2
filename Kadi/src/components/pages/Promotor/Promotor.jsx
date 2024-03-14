    import { useEffect, useState } from "react";
    import h_api from "../../../hook/HApi";
    import { Button } from "react-bootstrap/esm";

    import Lojas from './Lojas.jsx'
    import obterData from './obterData.js';
    export default function Promotor() {
        const [data, setData] = useState(0);
        const [verData, setVerData] = useState(0);
        const [proLojas, setProLojas] = useState([])
        const [loading, setLoading] = useState(false);
        const url = 'https://localhost:5000/pro/roteiro/ver';
        const reqPL = {
            method: 'POST',
            url: url,
            body: { cracha: 'P02' },
        }
        const reqProLoja = async () => {
            setLoading(true);
            await h_api(reqPL, setProLojas);
            setLoading(false);
        };
        useEffect(() => {
            reqProLoja();
        }, [url]);
        useEffect(() => {
            setData(obterData(verData));
        }, [verData]);

        const handleDiaMaisUm = () => {
            setVerData(verData + 1);
            setData(obterData(verData));
        }

        const handleDiaMenosUm = () => {
            setVerData(verData - 1);
        }
        const handleHoje = () => {
            setVerData(0);
        }
        console.log(proLojas);
        return (
            <>
                {
                    loading ? (

                        <p>Carregando...</p>
                    )
                        :
                        <div style={{ border: '20px solid rgba(0,0,0,0)', borderRadius: '4px' }}>
                            <div style={{ display: 'flex' }}>
                                <Button onClick={handleDiaMenosUm}>Voltar</Button>
                                <p>{data.dia}/{data.mes}/{data.ano}</p>
                                <Button onClick={handleDiaMaisUm}>Avançar</Button>
                                <Button onClick={handleHoje}>Hoje</Button>
                            </div>

                            <Lojas lojas={proLojas} />
                        </div>
                }
            </>
        );
    }


