import React, { useState } from 'react';
import Table from 'react-bootstrap/Table';
import Button from 'react-bootstrap/Button';

export default function Read({ open, data, Update, Delete }) {
    const [page, setPage] = useState(1);
    const itemsPerPage = 3;
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
                            <th style={{ textAlign: 'center' }} key={'Nome'}>Nome</th>
                            <th style={{ textAlign: 'center' }} key={'Roteirista'}>Roteirista</th>
                            <th style={{ textAlign: 'center' }} key={'Loja'}>Loja</th>
                            <th style={{ textAlign: 'center' }} key={'Rua'}>Rua</th>
                            <th style={{ textAlign: 'center' }} key={'numero'}>Número</th>
                            <th style={{ textAlign: 'center' }} key={'Ciclo'}>Ciclo</th>
                            <th style={{ textAlign: 'center' }} key={'dv'}>Primeira visita</th>
                            <th style={{ textAlign: 'center' }} key={'actions'}>Ações</th>
                        </tr>
                    </thead>
                    <tbody>
                        {visibleItems.map((r, index) => {
                            return (

                                <tr key={index}>
                                    <td key={index +'nome'}>{r.nome}</td>
                                    <td key={index +'r'}>{r.roteirista}</td>
                                    <td key={index+'l'}>{r.loja}</td>

                                    <td key={index+'ru'}>{r.rua}</td>
                                    <td key={index+'n'}>{r.numero}</td>
                                    <td key={index+'c'}>{r.ciclo}</td>
                                    <td key={index+'dv'}>{r.diavisita}</td>

                                    <td style={{ display: 'flex', justifyContent: 'space-around' }}>
                                        <Button style={{ margin: '2px' }} onClick={() => Update(r)}>Atualizar</Button>
                                        <Button variant="danger" onClick={() => Delete(r)}>Deletar</Button>
                                    </td>

                                </tr>
                            )
                        })}
                    </tbody>
                </Table>
                {renderPagination()}
            </>
        );
    } else {
        return null;
    }
}
