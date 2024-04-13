import { useState, useEffect } from "react";
import Crud from "../../crud/Crud";
import h_api from "../../../hook/HApi";
import filtro from "../../../utils/filtroSelect";
import backUrl from '../../../../config'
export default function Roteiro() {

    
    const exibir = [
        { row: "funcionário", type: "check" },
        { row: "cargo", type: "check" },
        { row: "cracha", type: "check" },
        { row: "superior", type: "check" },
        { row: "visita", type: "check" },
        { row: "ciclo", type: "form" },
        { row: "loja", type: "check" },
        { row: "endereco", type: "check" },
    ];

    const [superiores, setSuperiores] = useState([]);
    const [loja, setLoja] = useState([]);
    const [drop, setDrop] = useState([]);

    const visita = [{ visita: 'segunda' }, { visita: 'terça' }, { visita: 'quarta' }, { visita: 'quinta' }, { visita: 'sexta' }, { visita: 'sábado' }, { visita: 'domingo' }];
    const url = {
        ver: backUrl+'sup/roteiro/ver',
        editar: backUrl+'sup/roteiro/editar',
        deletar: backUrl+'sup/roteiro/deletar',
        incluir: backUrl+'sup/roteiro/incluir',
    };

    const reqRot = {
        method: 'GET',
        url: backUrl+'adm/func/ver',
    };
    const reqLoja = {
        method: 'GET',
        url: backUrl+'sup/mercado/ver',
    };

    useEffect(() => {
        const req = async () => {
            await h_api(reqRot, setSuperiores);
            await h_api(reqLoja, setLoja);
        };
        req();
    }, []);


    filtro(superiores, [
        { row: "nome" },
        { row: "cargo" },
        { row: "cracha" },
        ]);
    filtro(loja, [{ row: "loja"},
    { row: "endereco"}]);
    useEffect(() => {
        setDrop([{ funcionário: superiores }, { visita }, { loja: loja }])
    }, [superiores, loja]);

    
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
