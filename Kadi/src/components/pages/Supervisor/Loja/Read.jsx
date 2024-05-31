import React, { useState } from 'react';
import Table from 'react-bootstrap/Table';
import Button from 'react-bootstrap/Button';

export default function Read({ open, exibir, data, Update, Delete }) {
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
                            <th style={{ textAlign: 'center' }} key='loja'>Loja</th>
                            <th style={{ textAlign: 'center' }} key='Cep'>Cep</th>
                            <th style={{ textAlign: 'center' }} key='numero'>Número</th>
                            <th style={{ textAlign: 'center' }} key='rua'>Rua</th>
                            <th style={{ textAlign: 'center' }} key='cidade'>Cidade</th>
                            <th style={{ textAlign: 'center' }} key='celular'>Celular</th>
                            <th style={{ textAlign: 'center' }} key={'actions'}>Ações</th>
                        </tr>
                    </thead>
                    <tbody>
                        {visibleItems.map((item, index) => (
                            <tr key={index}>
                                    <>
                                        <td key={'loja'+index}>{item['loja']}</td>
                                        <td key={'cep'+index}>{item['cep']}</td>
                                        <td key={'numero'+index}>{item['numero']}</td>
                                        <td key={'rua'+index}>{item['rua']}</td>
                                        <td key={'cidade'+index}>{item['cidade']}</td>
                                        <td key={'celular'+index}>{item['celular']}</td>
                                    </>
                                <td style={{ display: 'flex', justifyContent: 'space-around' }}>
                                    <Button style={{ margin: '2px' }} onClick={() => Update(item)}>Atualizar</Button>
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