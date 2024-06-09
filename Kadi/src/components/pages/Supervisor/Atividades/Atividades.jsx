import Crud from "./Crud";
import backUrl  from "../../../../../config";
export default function Promotores() {


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
            url={url}
        />
        </>
    )
} 
