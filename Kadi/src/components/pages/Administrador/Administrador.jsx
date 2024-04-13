import { Navbar, Nav } from "react-bootstrap";

import Funcionarios from "./funcionarios/Funcionarios";
import Logout from "../usuario/Logout";
import { useState } from "react";

export default function Supervisor() {
    const [func, setFunc] = useState(true);
    const handleFunc = () =>{
        setFunc(true);        
    }
    return (
        <>
            <Navbar expand="lg" className="bg-body-tertiary justify-content-between" bg="primary" data-bs-theme="dark">
                    <Navbar.Brand href="#home">Administrador</Navbar.Brand>
                    <Navbar.Toggle aria-controls="basic-navbar-nav" />
                    <Navbar.Collapse id="basic-navbar-nav">
                        <Nav>
                            <Nav.Link onClick={handleFunc} >Funcionários</Nav.Link>
                        </Nav>
                    </Navbar.Collapse>
                    
                    <Logout/>
            </Navbar>
            {func && <Funcionarios />}
        </>);
}