import { Navbar, Nav } from "react-bootstrap";
import { useState, useEffect } from "react";

import Roteiro from "./Tarefas/Roteiro";
import AdcLoja from "./loja/Loja";
import Notificacao from "./Tarefas/Notificacao";
import Logout from "../usuario/Logout";
import './promotor.css'


export default function Promotor() {
    const [showRoteiro, setShowRoteiro] = useState(true);
    const [showAdcLoja, setShowAdcLoja] = useState(false);
    const [showNotificacao, setShowNotificacao] = useState(false);
    const [id_loja, setId_loja] = useState(null);
    
    const handleRoteiro = () =>{
        setShowRoteiro(true);    
        setShowNotificacao(false);    
         setShowAdcLoja(false);    
                
     }
      const handleAdcLoja = () =>{
         setShowRoteiro(false);
         setShowNotificacao(false);
         setShowAdcLoja(true);     
          
      }
     const handleNotificacao = () =>{
         setShowRoteiro(false);    
         setShowNotificacao(true);
          setShowAdcLoja(false);    
              
      }
    return (
        <>
            <Navbar expand={'lg'} className="bg-body-tertiary justify-content-between label" bg="primary" data-bs-theme="dark">
                    <Navbar.Brand className="label2" href="#home">Promotor</Navbar.Brand>
                    <Navbar.Toggle aria-controls="basic-navbar-nav" />
                    <Navbar.Collapse id="basic-navbar-nav">
                        <Nav>
                             <Nav.Link className="label2" onClick={handleRoteiro}>Roteiro</Nav.Link>
                             <Nav.Link className="label2" onClick={handleAdcLoja}>Adicionar Loja</Nav.Link> 
                             <Nav.Link className="label2" onClick={handleNotificacao}>Log do dia</Nav.Link> 
                        </Nav>
                    </Navbar.Collapse>
                    
                    <Logout/>
            </Navbar>
            {showRoteiro && <Roteiro setId_loja={setId_loja} />}
            {showAdcLoja && <AdcLoja />} 
            {showNotificacao && <Notificacao />}
        </>);
}