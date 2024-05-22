import { useState, useEffect } from "react";
import h_api from "../../../../hook/HApi";
import backUrl from "../../../../../config";
import Dia from "./SelecionarDia";

export default function Notificacao() {
    const hoje = new Date().toISOString().split('T')[0];
    const [date, setDate] = useState(hoje);
    const [notificacoes, setNotificacoes] = useState(null);
    const url = backUrl + 'pro/log'
    const reqPL = {
        method: 'POST',
        url: url,
        body: { date },
    }

    const reqNotificacao = async () => {
        setNotificacoes(null);
        await h_api(reqPL, setNotificacoes);
    };

    useEffect(() => {
        reqNotificacao();
    }, [url, date]);
    return (
        <div style={{ margin: '10px' }}>
            <Dia hoje={hoje} date={date} setDate={setDate} />
            <div style={{marginTop:'10px',display: "flex", flexDirection:'column', alignItems: 'center'}}>
                {notificacoes && notificacoes.map((n) => {
                    return (
                        <div key={n.id_servico} >
                            <p>Realizou {n.descricao} na loja {n.loja}  {n.datahora}</p>
                        </div>
                    )
                })}
            </div>
        </div>
    );
}