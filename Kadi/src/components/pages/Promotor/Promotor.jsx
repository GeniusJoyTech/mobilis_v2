import { Navbar, Nav } from "react-bootstrap";
import { useState, useEffect } from "react";

import Roteiro from "./Tarefas/Roteiro";
import AdcLoja from "./loja/Loja";
import Notificacao from "./Tarefas/Notificacao";
import Logout from "../usuario/Logout";


export default function Supervisor() {
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
      useEffect(()=>{
        console.log(id_loja);
     }, [id_loja]);
    return (
        <>
            <Navbar expand="lg" className="bg-body-tertiary justify-content-between" bg="primary" data-bs-theme="dark">
                    <Navbar.Brand href="#home">Promotor</Navbar.Brand>
                    <Navbar.Toggle aria-controls="basic-navbar-nav" />
                    <Navbar.Collapse id="basic-navbar-nav">
                        <Nav>
                             <Nav.Link onClick={handleRoteiro}>Roteiro</Nav.Link>
                             <Nav.Link onClick={handleAdcLoja}>Adicionar Loja</Nav.Link> 
                             <Nav.Link onClick={handleNotificacao}>Log do dia</Nav.Link> 
                        </Nav>
                    </Navbar.Collapse>
                    
                    <Logout/>
            </Navbar>
            {showRoteiro && <Roteiro setId_loja={setId_loja} />}
            {showAdcLoja && <AdcLoja />} 
            {showNotificacao && <Notificacao />}
        </>);
}