import { Navbar, Nav } from "react-bootstrap";

import Roteiro from "./Roteiro/Roteiro"
import Promotores from "./Promotores/Promotores";
import Loja from "./Loja/Loja";
import Visitas from "./Visitas";
import Atividades from "./Atividades/Atividades";
import Logout from "../usuario/Logout";
import { useState } from "react";

export default function Supervisor() {
    const [rot, setRot] = useState(false);
    const [prom, setProm] = useState(false);
    const [lj, setLj] = useState(false);
    const [vis, setVis] = useState(true);
    const [atv, setAtv] = useState(false);
    
    const handleRot = () =>{
        setRot(true);
        setProm(false);
        setLj(false);
        setVis(false);
        setAtv(false);
        
    }
    const handleProm = () =>{
        setRot(false);
        setProm(true);
        setLj(false);
        setVis(false);
        setAtv(false);
        
    }
    const handleLj = () =>{
        setRot(false);
        setProm(false);
        setLj(true);
        setVis(false);
        setAtv(false);
        
    }
    const handleVis = () =>{
        setRot(false);
        setProm(false);
        setLj(false);
        setVis(true);
        setAtv(false);
        
    }
    const handleAtv = () =>{
        setRot(false);
        setProm(false);
        setLj(false);
        setVis(false);
        setAtv(true);
        
    }
    return (
        <>
            <Navbar expand="lg" className="bg-body-tertiary justify-content-between" bg="primary" data-bs-theme="dark">
                    <Navbar.Brand href="#home">Supervisor</Navbar.Brand>
                    <Navbar.Toggle aria-controls="basic-navbar-nav" />
                    <Navbar.Collapse id="basic-navbar-nav">
                        <Nav>
                            <Nav.Link onClick={handleRot} >Roteiro</Nav.Link>
                            <Nav.Link onClick={handleProm}>Promotores</Nav.Link>
                            <Nav.Link onClick={handleLj}>Loja</Nav.Link>
                            <Nav.Link onClick={handleVis}>Visitas</Nav.Link>
                            <Nav.Link onClick={handleAtv}>Atividades</Nav.Link>
                        </Nav>
                    </Navbar.Collapse>
                    
                    <Logout/>
            </Navbar>
            {rot && <Roteiro />}
            {prom && <Promotores />}
            {lj && <Loja />}
            {vis && <Visitas />}
            {atv && <Atividades />}
        </>);
}