import { useState, useEffect } from "react";
import Crud from "./Crud";
import h_api from "../../../../hook/HApi";
import backUrl from '../../../../../config'
export default function Roteiro() {

    const [promotores, setPromotores] = useState([]);
    const [loja, setLoja] = useState([]);

    const url = {
        ver: backUrl+'sup/roteiro/ver',
        editar: backUrl+'sup/roteiro/editar',
        deletar: backUrl+'sup/roteiro/deletar',
        incluir: backUrl+'sup/roteiro/incluir',
    };

    const reqProm = {
        method: 'GET',
        url: backUrl+'sup/promotor/ver',
    };
    const reqLoja = {
        method: 'GET',
        url: backUrl+'sup/mercado/ver',
    };

    useEffect(() => {
        const req = async () => {
            await h_api(reqProm, setPromotores);
            await h_api(reqLoja, setLoja);
        };
        req();
    }, []);

    return (
        <>
            <Crud
                titulo='Roteiro'
                promotores={promotores}
                lojas={loja}
                url={url}
            />
        </>
    )
}
