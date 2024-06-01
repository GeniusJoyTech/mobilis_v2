import React, { useState } from 'react';
import Table from 'react-bootstrap/Table';
import Button from 'react-bootstrap/Button';

export default function Read({ open, data, Update, Delete }) {
    const [page, setPage] = useState(1);
    const itemsPerPage = 10;

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
                            <th style={{ textAlign: 'center' }} key='descricao'>Descrição</th>
                            {/* <th style={{ textAlign: 'center' }} key='tipo'>Tipo</th> */}
                            <th style={{ textAlign: 'center' }} key='observacao'>Observação</th>
                            <th style={{ textAlign: 'center' }} key={'actions'}>Ações</th>
                        </tr>
                    </thead>
                    <tbody>
                        {visibleItems.map((item, index) => (
                            <tr key={index}>

                                <td key={index+1}>{item.descricao}</td>
                                {/* <td key={index}>{item.tipo}</td> */}
                                <td key={index+2}>{item.observacao}</td>
                                <td style={{ display: 'flex', justifyContent: 'space-around' }}>
                                    {item.id_atividade > 2 ?
                                        <>
                                            <Button  onClick={() => Update(item)}>Atualizar</Button>
                                            <Button variant="danger" onClick={() => Delete(item)}>Deletar</Button>
                                        </>
                                        :
                                        <p>Essa atividade não pode ser editada ou excluída</p>
                                    }
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