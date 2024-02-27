import { useState, useEffect } from "react";
import Crud from "../../crud/Crud"


import h_api from "../../../hook/HApi";

import filtro from "../../../utils/filtroSelect";
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
        ver: 'https://localhost:5000/sup/roteiro/ver',
        editar: 'https://localhost:5000/sup/roteiro/editar',
        deletar: 'https://localhost:5000/sup/roteiro/deletar',
        incluir: 'https://localhost:5000/sup/roteiro/incluir',
    };

    const reqRot = {
        method: 'GET',
        url: 'https://localhost:5000/adm/func/ver',
    };
    const reqLoja = {
        method: 'GET',
        url: 'https://localhost:5000/sup/mercado/ver',
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
