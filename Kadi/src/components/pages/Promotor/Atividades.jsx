import React, { useState, useEffect } from "react";
import { Button } from "react-bootstrap";
import Fotos from "./Fotos";

export default function Atividades({ data, atividades }) {
  const [cameraLojas, setCameraLojas] = useState(false);
  const fotoServicoRef = React.useRef(false);

  function toggleCameraLojas() {
    setCameraLojas(!cameraLojas);
  }

  function fotoServiço() {
    toggleCameraLojas();
  }

  function fotoSairLoja() {
    fotoServicoRef.current = true;
    toggleCameraLojas();
  }
  
  useEffect(() => {
    if (!cameraLojas && fotoServicoRef.current) {
      atividades();
    }
  }, [cameraLojas]);


  return (
    <>
      {atividades &&
        <div style={{ display: "flex", flexDirection: "column" }}>
          <Button onClick={fotoServiço}  style={{margin: '4px 0 4px'}}>Iniciar serviço.</Button>
          <Button onClick={fotoServiço}  style={{margin: '0 0 4px'}}>Finalizar serviço.</Button>
          <Button onClick={fotoSairLoja} style={{margin: '0 0 4px'}}>Sair da Loja.</Button>
        </div>
      }
      {cameraLojas && <Fotos data={data} toggleCamera={toggleCameraLojas} send={fotoServiço} />}
    </>
  );
}
