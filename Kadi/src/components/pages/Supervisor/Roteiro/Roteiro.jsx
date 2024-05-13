import { useState, useEffect } from "react";
import Crud from "./Crud";
import h_api from "../../../../hook/HApi";
import backUrl from '../../../../../config'
export default function Roteiro() {

    
    const exibir = [
        { row: "nome", type: "check" },
        { row: "roteirista", type: "check" },
        { row: "loja", type: "check" },
        { row: "rua", type: "check" },
        { row: "numero", type: "check" },
        { row: "ciclo", type: "form" },
        { row: "diavisita", type: "form", t: 'date' },
    ];

    const [promotores, setPromotores] = useState([]);
    const [loja, setLoja] = useState([]);
    const [drop, setDrop] = useState([]);

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

useEffect(()=>{
    setDrop([{ funcionario: promotores }, { loja: loja }])
},[promotores, loja])
    return (
        <>
            <Crud
                titulo='Roteiro'
                exibir={exibir}
                dropItem={drop}
                url={url}
            />
        </>
    )
} 
