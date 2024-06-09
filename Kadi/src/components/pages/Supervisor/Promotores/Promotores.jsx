import Crud from "./CrudProm";
import backUrl from "../../../../../config";
export default function Promotores() {
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
                url={url}
            />
        </>
    )
} 
