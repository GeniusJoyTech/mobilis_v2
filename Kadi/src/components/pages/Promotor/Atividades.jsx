import React, { useState, useEffect } from "react";
import { Button } from "react-bootstrap";
import Fotos from "./Fotos";

export default function Atividades({ data, atividades }) {
  const [atv, setAtv]=useState(0);
  const [cameraLojas, setCameraLojas] = useState(false);
  const fotoServicoRef = React.useRef(false);

  function toggleCameraLojas() {
    setCameraLojas(!cameraLojas);
  }

  function fotoServiço(pk_atv) {
    setAtv(pk_atv)
    toggleCameraLojas();
  }

  function fotoSairLoja() {
    fotoServicoRef.current = true;
    setAtv(4);
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
          <Button onClick={()=> fotoServiço(2)}  style={{margin: '4px 0 4px'}}>Iniciar serviço.</Button>
          <Button onClick={()=>fotoServiço(3)}  style={{margin: '0 0 4px'}}>Finalizar serviço.</Button>
          <Button onClick={fotoSairLoja} style={{margin: '0 0 4px'}}>Sair da Loja.</Button>
        </div>
      }
      {cameraLojas && <Fotos data={data} toggleCamera={toggleCameraLojas} send={fotoServiço} pk_atv={atv}/>}
    </>
  );
}
