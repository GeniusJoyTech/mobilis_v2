import React, { useState } from 'react';
import {Table, Button} from 'react-bootstrap';

export default function Read({ open, exibir, data, Update, Delete, Status }) {
    const [page, setPage] = useState(1);
    const itemsPerPage = 10;
    const row = exibir.map((item) => item.row);

    const totalPages = Math.ceil(data.length / itemsPerPage);

    const handleClickPrevious = () => {
        setPage((prevPage) => Math.max(prevPage - 1, 1));
    };

    const handleClickNext = () => {
        setPage((prevPage) => Math.min(prevPage + 1, totalPages));
    };

    const renderPagination = () => (
        <div>
            <Button onClick={handleClickPrevious} disabled={page === 1}>
                Previous
            </Button>
            <span> Page {page} of {totalPages} </span>
            <Button onClick={handleClickNext} disabled={page === totalPages}>
                Next
            </Button>
        </div>
    );

    if (open) {
        const startIndex = (page - 1) * itemsPerPage;
        const endIndex = startIndex + itemsPerPage;
        const visibleItems = data.slice(startIndex, endIndex);

        return (
            <>
                <Table striped bordered hover>
                    <thead>
                        <tr>
                            {row.map((propriedade, index) => (
                                <th style={{textAlign:'center'}} key={index}>{propriedade}</th>
                            ))}
                            <th style={{textAlign:'center'}} key={'actions'}>Ações</th>
                        </tr>
                    </thead>
                    <tbody>
                        {visibleItems.map((item, index) => (
                            <tr key={index}>
                                {row.map((propriedade, index) => (
                                    <td key={index}>{item[propriedade]}</td>
                                ))}
                                <td style={{display:'flex', justifyContent:'space-around'}}> 
                                    <Button style={{margin: '2px'}} onClick={() => Update(item)}>Atualizar</Button>
                                    {
                                        item.status == 'Ativo' ?
                                        <Button variant="danger" onClick={() => Status({id_usuario: item.id_usuario, status: 'Inativo'})}>Inativar</Button>
                                        :
                                        <Button variant="success" onClick={() => Status({id_usuario: item.id_usuario, status: 'Ativo'})}>Ativar</Button>
                                    }
                                    <Button variant="danger" onClick={() => Delete(item)}>Deletar</Button>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </Table>
                {renderPagination()}
            </>
        );
    } else {
        return null;
    }
}