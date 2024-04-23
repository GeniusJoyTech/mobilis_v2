import Crud from "../../../crud/Crud";
import backUrl  from "../../../../../config";
export default function Promotores() {


    const exibir = [
        { row: "descricao", type: "form" },
        { row: "tipo", type: "form" },
        { row: "observacao", type: "form" }
    ];
    const url = {
        ver: backUrl + 'sup/atv/ver',
        editar: backUrl + 'sup/atv/editar',
        deletar: backUrl + 'sup/atv/deletar',
        incluir: backUrl + 'sup/atv/incluir',
    };


    return (
        <>
        <Crud
            titulo='Atividade'
            exibir={exibir}
            url={url}
        />
        </>
    )
} 
