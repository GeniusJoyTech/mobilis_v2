import Crud from "./CrudLoja"
import backUrl from '../../../../../config'
export default function Loja() {

    
    const exibir = [
        { row: "loja", type: "form" },  
        { row: "cep", type: "form" },
        { row: "numero", type: "form" },
        { row: "rua", type: "form" },
        { row: "cidade", type: "form" },
        { row: "celular", type: "form" },
    ];

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
                exibir={exibir}
                url={url}
            />
        </>
    )
} 
