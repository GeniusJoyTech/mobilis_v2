import Crud from "./CrudLoja"

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
        ver: 'https://localhost:5000/sup/mercado/ver',
        editar: 'https://localhost:5000/sup/mercado/editar',
        deletar: 'https://localhost:5000/sup/mercado/deletar',
        incluir: 'https://localhost:5000/sup/mercado/incluir',
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
