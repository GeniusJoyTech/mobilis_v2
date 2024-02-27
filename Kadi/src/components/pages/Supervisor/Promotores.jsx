import Crud from "../../crud/Crud"
export default function Promotores() {

    
    const exibir = [
        { row: "nome", type: "form" },
        { row: "cracha", type: "form" },
        { row: "superior", type: "form" },
        { row: "endereco", type: "form" },
        { row: "status", type: "form" },
        { row: "email", type: "form" },
        { row: "senha", type: "form" }
    ];
    const drop = [{cargo: [{ cargo: 'Promotor' }, { cargo: 'Supervisor' }, { cargo: 'Administrador' }]}];
    const url = {
        ver: 'https://localhost:5000/sup/promotor/ver',
        editar: 'https://localhost:5000/sup/promotor/editar',
        deletar: 'https://localhost:5000/sup/promotor/deletar',
        incluir: 'https://localhost:5000/sup/promotor/incluir',
    };



    return (
        <>
            <Crud
                titulo='Promotores'
                exibir={exibir}
                url={url}
                dropItem={drop}
            />
        </>
    )
} 
