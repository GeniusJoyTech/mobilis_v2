import { Navbar, Nav } from "react-bootstrap";

import Roteiro from "./Roteiro";
import Promotores from "./Promotores";
import Loja from "./Loja";
import Logout from "../usuario/Logout";
import { useState } from "react";

export default function Supervisor() {
    const [rot, setRot] = useState(true);
    const [prom, setProm] = useState(false);
    const [lj, setLj] = useState(false);
    const handleRot = () =>{
        setRot(true);
        setProm(false);
        setLj(false);
        
    }
    const handleProm = () =>{
        setRot(false);
        setProm(true);
        setLj(false);
        
    }
    const handleLj = () =>{
        setRot(false);
        setProm(false);
        setLj(true);
        
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
                        </Nav>
                    </Navbar.Collapse>
                    
                    <Logout/>
            </Navbar>
            {rot && <Roteiro />}
            {prom && <Promotores />}
            {lj && <Loja />}
        </>);
}