import { Navbar, Nav } from "react-bootstrap";
import { useState } from "react";

import Roteiro from "./Tarefas/Roteiro";
import AdcLoja from "./Tarefas/Camera";
//import Atividade from "./Tarefas/Atividades";

import Logout from "../usuario/Logout";


export default function Supervisor() {
    const [roteiro, setRoteiro] = useState(true);
    const [adcLoja, setAdcLoja] = useState(false);
    // const [atividade, setAtividade] = useState(false);
    
    const handleRoteiro = () =>{
        setRoteiro(true);    
        setAdcLoja(false);        
     }
     const handleAdcLoja = () =>{
        setRoteiro(false);
        setAdcLoja(true);     
     }
    return (
        <>
            <Navbar expand="lg" className="bg-body-tertiary justify-content-between" bg="primary" data-bs-theme="dark">
                    <Navbar.Brand href="#home">Promotor</Navbar.Brand>
                    <Navbar.Toggle aria-controls="basic-navbar-nav" />
                    <Navbar.Collapse id="basic-navbar-nav">
                        <Nav>
                             <Nav.Link onClick={handleRoteiro}>Roteiro</Nav.Link>
                             <Nav.Link onClick={handleAdcLoja}>Adicionar Loja</Nav.Link> 
                        </Nav>
                    </Navbar.Collapse>
                    
                    <Logout/>
            </Navbar>
            {roteiro && <Roteiro />}
            {adcLoja && <AdcLoja />}
        </>);
}