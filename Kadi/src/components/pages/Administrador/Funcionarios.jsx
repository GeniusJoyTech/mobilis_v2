import Crud from "../../crud/Crud"
export default function Funcionarios() {

    
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
        ver: 'https://localhost:5000/adm/func/ver',
        editar: 'https://localhost:5000/adm/func/editar',
        deletar: 'https://localhost:5000/adm/func/deletar',
        incluir: 'https://localhost:5000/adm/func/incluir',
    };



    return (
        <>
            <Crud
                titulo='Funcionarios'
                exibir={exibir}
                url={url}
                dropItem={drop}
            />
        </>
    )
} 
