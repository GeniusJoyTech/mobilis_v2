import Crud from "./CrudProm";
import backUrl  from "../../../../../config";
export default function Promotores() {


    const exibir = [
        { row: "nome", type: "form" },
        { row: "cracha", type: "form" },
        { row: "cargo", type: "form" },
        { row: "status", type: "form" },
        { row: "cep", type: "form" },
        { row: "numero", type: "form" },
        { row: "rua", type: "form" },
        { row: "cidade", type: "form" },
        { row: "email", type: "form" },
    ];
    const url = {
        ver: backUrl + 'sup/promotor/ver',
        editar: backUrl + 'sup/promotor/editar',
        deletar: backUrl + 'sup/promotor/deletar',
        incluir: backUrl + 'sup/promotor/incluir',
    };


    return (
        <>
        <Crud
            titulo='Promotor'
            exibir={exibir}
            url={url}
        />
        </>
    )
} 
