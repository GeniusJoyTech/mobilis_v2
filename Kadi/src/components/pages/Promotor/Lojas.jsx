// Acordeon.js
import React, { useState } from 'react';
import Accordion from 'react-bootstrap/Accordion';
import Fotos from './Fotos';
import Atividades from './Atividades';
import { Button } from 'react-bootstrap';

export default function Acordeon({ lojas }) {
  const [cameraLojas, setCameraLojas] = useState(false);
  const [atividades, setAtvidades] = useState(false);
  const [ljs, setLjs] = useState(true);
  const [data, setData] = useState({});

  const toggleCameraLojas = () => {
    setCameraLojas(!cameraLojas);
    setLjs(!ljs);
  };
  const toggleCameraAtividades = () => {
    setCameraLojas(!cameraLojas);
    setAtvidades(!atividades);
  };
  const registrarFotoLoja = (loja) => {
    toggleCameraLojas();
    setData(loja);
  };
  
  const toggleAtividades = () => {
    setAtvidades(false);
    setLjs(true);
  };
  return (
    <>
      {
        ljs && <Accordion defaultActiveKey="0">
        {
        !cameraLojas &&
          lojas.map((loja, index) => (
            <Accordion.Item key={index} eventKey={index}>
              <Accordion.Header>{loja.loja}</Accordion.Header>
              <Accordion.Body>
                <p>{loja.endereco}</p>
                <p>{loja.visita}</p>
                <p>{loja.ciclo}</p>
                <Button onClick={() => registrarFotoLoja(loja)}>Iniciar Visita</Button>
              </Accordion.Body>
            </Accordion.Item>
          ))}
      </Accordion>
      }
      {cameraLojas && <Fotos data={data} toggleCamera={toggleCameraLojas} send={toggleCameraAtividades} pk_atv={1}/>}
      {atividades && <Atividades data={data} atividades={toggleAtividades}/>}
      
    </>
  );
}
