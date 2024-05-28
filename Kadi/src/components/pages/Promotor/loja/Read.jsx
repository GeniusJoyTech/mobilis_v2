import React, { useState } from 'react';
import Table from 'react-bootstrap/Table';
import Button from 'react-bootstrap/Button';

import '../promotor.css'

import h_api from "../../../../hook/HApi";

export default function Read({ open, exibir, data, url }) {
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
    const adcLoja = async (item) => {
        const body = { ...item, diavisita: new Date().toLocaleDateString('en-Ca') };
        console.log(body)
        const reqRot = {
            method: 'post',
            url: url.incluir,
            body: body
        };
        await h_api(reqRot,null);
        alert('Verifique seu roteiro.')
        
    }
    
    const handleConfirm = (item) => {
        let userConfirmed = confirm(`Você tem certeza que deseja adicionar ${item.loja}, ${item.rua} ${item.numero}, ao seu roteiro? ` );

        // Verifica se o usuário clicou em "OK" ou "Cancelar"
        if (userConfirmed) {
            adcLoja(item)
        } else {
            // Se o usuário clicou em "Cancelar"
            alert("Loja não adicionada");
        }

    }
    const renderPagination = () => (
        <div>
            <Button className='label' onClick={handleClickPrevious} disabled={page === 1}>
                Anterior
            </Button>
            <span className='label'> Page {page} of {totalPages} </span>
            <Button className='label' onClick={handleClickNext} disabled={page === totalPages}>
                próximo
            </Button>
        </div>
    );

    if (open) {
        const startIndex = (page - 1) * itemsPerPage;
        const endIndex = startIndex + itemsPerPage;
        const visibleItems = data.slice(startIndex, endIndex);

        return (
            <>
                <div style={{ maxWidth: '100vw', overflowY: 'auto' }}>
                    <Table striped bordered hover style={{ maxWidth: '100vw', overflowY: 'auto' }}>
                        <thead>
                            <tr>
                                {row.map((propriedade, index) => (
                                    <th className='label' style={{ textAlign: 'center' }} key={index}>{propriedade}</th>
                                ))}
                                <th className='label' style={{ textAlign: 'center' }} key={'actions'}>Ações</th>
                            </tr>
                        </thead>
                        <tbody>
                            {visibleItems.map((item, index) => (
                                <tr key={index}>
                                    {row.map((propriedade, index) => (
                                        <td className='label2'  key={index}>{item[propriedade]}</td>
                                    ))}
                                    <td style={{ display: 'flex', justifyContent: 'space-around' }}>
                                        <Button className='label2' onClick={() => { handleConfirm(item) }} style={{ margin: '2px' }} >Adicionar</Button>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </Table>
                </div>
                {renderPagination()}

            </>
        );
    } else {
        return null;
    }
}
