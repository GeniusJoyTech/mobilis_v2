import React, { useState} from 'react';
import { Accordion, Button } from 'react-bootstrap/';

export default function Lojas({ id_agenda, id_loja, loja, endereco, cep, mostrarCamera}) {
    return (
        <>
            <Accordion>
                <Accordion.Item eventKey="0">
                    <Accordion.Header>Loja: {loja}</Accordion.Header>
                    <Accordion.Body>
                        <div>
                            <p>Endereço: {endereco}</p>
                            <p>Cep: {cep}</p>
                        </div>
                        <div style={{ borderBottom: '1px solid', borderRadius: '1px', margin: '2px' }}></div>
                        <div style={{ display: 'flex' }}>
                            <Button onClick={()=>{mostrarCamera(id_agenda, id_loja, 1)}}>
                                Entrada
                            </Button>
                        </div>
                    </Accordion.Body>
                </Accordion.Item>
            </Accordion>
        </>
    );
}