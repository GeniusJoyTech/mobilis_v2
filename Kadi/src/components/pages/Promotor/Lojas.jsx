// Acordeon.js
import React, { useState } from 'react';
import Accordion from 'react-bootstrap/Accordion';
import Fotos from './Fotos';
import { Button } from 'react-bootstrap';

export default function Acordeon({ lojas }) {
  const [camera, setCamera] = useState(false);
  const [data, setData] = useState({});

  const toggleCamera = () => {
    setCamera(!camera);
  };

  const registrarFoto = (loja) => {
    toggleCamera();
    setData(loja);
  };

  return (
    <>
      <Accordion defaultActiveKey="0">
        {!camera &&
          lojas.map((loja, index) => (
            <Accordion.Item key={index} eventKey={index}>
              <Accordion.Header>{loja.loja}</Accordion.Header>
              <Accordion.Body>
                <p>{loja.endereco}</p>
                <p>{loja.visita}</p>
                <p>{loja.ciclo}</p>
                <Button onClick={() => registrarFoto(loja)}>Iniciar Visita</Button>
              </Accordion.Body>
            </Accordion.Item>
          ))}
      </Accordion>
      {camera && <Fotos data={data} toggleCamera={toggleCamera} />}
    </>
  );
}
