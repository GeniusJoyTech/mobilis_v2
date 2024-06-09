import Crud from "./CrudLoja"
import backUrl from '../../../../../config'
export default function Loja() {

    
    const url = {
        ver: backUrl+'sup/mercado/ver',
        editar: backUrl+'sup/mercado/editar',
        deletar: backUrl+'sup/mercado/deletar',
        incluir: backUrl+'sup/mercado/incluir',
    };
    
    return (
        <>
            <Crud
                titulo='Lojas'
                url={url}
            />
        </>
    )
} 
