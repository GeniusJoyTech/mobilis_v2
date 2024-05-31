import React, { useState } from 'react';
import { Accordion, Button } from 'react-bootstrap/';
import '../promotor.css';

// export default function Lojas({ id_agenda, id_loja, loja, endereco, cep, mostrarCamera}) {
export default function Lojas({ loja, endereco, cep }) {
    return (
        <>
            <Accordion>
                <Accordion.Item eventKey="0">
                    <Accordion.Header><p className='label'>Loja: {loja}</p></Accordion.Header>
                    <Accordion.Body>
                        <div>
                            <p className='label'>Endereço: {endereco}</p>
                            <p className='label'>Cep: {cep}</p>
                        </div>
                        <div style={{ borderBottom: '1px solid', borderRadius: '1px', margin: '2px' }}></div>

                    </Accordion.Body>
                </Accordion.Item>
            </Accordion>
        </>
    );
}