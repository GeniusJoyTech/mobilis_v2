import React, { useState } from 'react';
import { Table, Button } from 'react-bootstrap';

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
            <div style={{maxHeight:'90vh', overflowY: 'scroll'}}>
                <Table striped bordered hover >
                    <thead>
                        <tr>
                            {/* {row.map((propriedade, index) => (
                                <th style={{textAlign:'center'}} key={index}>{propriedade}</th>
                            ))} */}

                            <th style={{ textAlign: 'center' }} key={0}>{'Nome'}</th>
                            <th style={{ textAlign: 'center' }} key={1}>{'Crachá'}</th>
                            <th style={{ textAlign: 'center' }} key={2}>{'Cargo'}</th>
                            <th style={{ textAlign: 'center' }} key={3}>{'Superior'}</th>
                            <th style={{ textAlign: 'center' }} key={4}>{'Status'}</th>
                            <th style={{ textAlign: 'center' }} key={5}>{'Cep'}</th>

                            <th style={{ textAlign: 'center' }} key={6}>{'Número'}</th>
                            <th style={{ textAlign: 'center' }} key={7}>{'Rua'}</th>
                            <th style={{ textAlign: 'center' }} key={8}>{'Cidade'}</th>
                            <th style={{ textAlign: 'center' }} key={9}>{'E-mail'}</th>
                            <th style={{ textAlign: 'center' }} key={'actions'}>Ações</th>
                        </tr>
                    </thead>
                    <tbody >
                        {visibleItems.map((item, index) => (
                            <tr key={index}>
                                {row.map((propriedade, index) => (
                                    <td key={index}>{item[propriedade]}</td>
                                ))}
                                <td style={{ display: 'flex', justifyContent: 'space-around' }}>
                                    <Button style={{ margin: '2px' }} onClick={() => Update(item)}>Atualizar</Button>
                                    {
                                        item.status == 'Ativo' ?
                                            <Button variant="danger" onClick={() => Status({ id_usuario: item.id_usuario, status: 'Inativo' })}>Inativar</Button>
                                            :
                                            <Button variant="success" onClick={() => Status({ id_usuario: item.id_usuario, status: 'Ativo' })}>Ativar</Button>
                                    }
                                    <Button variant="danger" style={{ margin: '2px' }} onClick={() => Delete(item)}>Deletar</Button>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </Table>
                {renderPagination()}
            </div>
        );
    } else {
        return null;
    }
}