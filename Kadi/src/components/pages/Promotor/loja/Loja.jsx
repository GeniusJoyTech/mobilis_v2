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
        ver: backUrl+'pro/mercado/ver',
        incluir: backUrl+'pro/mercado/incluir',
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
