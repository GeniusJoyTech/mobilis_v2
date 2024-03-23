import React, { useEffect, useState } from "react";
import h_api from "../../../hook/HApi";
import Dropdown from 'react-bootstrap/Dropdown';

export default function Visitas() {
    const [prom, setProm] = useState([]);
    const [selectedPromotor, setSelectedPromotor] = useState(null);

    const reqFuncs = {
        method: "GET",
        url: 'https://localhost:5000/sup/promotor/ver',
    };

    const reqProm = async () => {
        await h_api(reqFuncs, setProm);
    };

    useEffect(() => {
        reqProm();
    }, []);

    const handleSelectPromotor = (promotor) => {
        setSelectedPromotor(promotor); // Define o promotor selecionado quando um item é clicado
        console.log(promotor);
    };

    return (
        <div style={{ margin: '4px' }}>
            <SelProm prom={prom} handle={handleSelectPromotor} selP={selectedPromotor} />
            
        </div>
    )
}

function SelProm({ prom, handle, selP }) {
    return (
        <Dropdown>
            <Dropdown.Toggle id="dropdown-basic">
                {selP ? `${selP.nome} - ${selP.cracha}` : "Selecione um promotor"}
            </Dropdown.Toggle>

            <Dropdown.Menu>
                {prom.map((item, index) => (
                    <Dropdown.Item key={index} onClick={() => handle(item)}>
                        {item.nome} - {item.cracha}
                    </Dropdown.Item>
                ))}
            </Dropdown.Menu>
        </Dropdown>
    );
}
