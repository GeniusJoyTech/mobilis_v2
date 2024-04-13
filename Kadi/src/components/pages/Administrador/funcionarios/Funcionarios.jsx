import Crud from "./CrudFunc";
import { backUrl } from "../../../../../config";
export default function Funcionarios() {

    
    const exibir = [
        { row: "nome", type: "form" },
        { row: "cracha", type: "form" },
        { row: "superior", type: "form" },
        { row: "status", type: "form" },
        { row: "cep", type: "form" },
        { row: "numero", type: "form" },
        { row: "rua", type: "form" },
        { row: "cidade", type: "form" },
        { row: "email", type: "form" },
        { row: "senha", type: "form" }
    ];
    const url = {
        ver: backUrl+'adm/func/ver',
        editar: backUrl+'adm/func/editar',
        deletar: backUrl+'adm/func/deletar',
        incluir: backUrl+'adm/func/incluir',
    };


    return (
        <>
            <Crud
                titulo='Funcionário'
                exibir={exibir}
                url={url}
            />
        </>
    )
} 
