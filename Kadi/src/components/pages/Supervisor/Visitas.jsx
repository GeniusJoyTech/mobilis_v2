import React, { useEffect, useState } from "react";
import h_api from "../../../hook/HApi";
import Dropdown from 'react-bootstrap/Dropdown';
import backUrl from '../../../../config'
export default function Visitas() {
    const [prom, setProm] = useState([]);
    const [visP, setVisP] = useState([]);
    const [selectedPromotor, setSelectedPromotor] = useState(null);

    const reqFuncs = {
        method: "GET",
        url: backUrl+'sup/promotor/ver',
    };
    const reqVisP = {
        method: "POST",
        url: backUrl+'sup/pro/visitas/ver',
        body: selectedPromotor,
    };
    const reqApiPro = async () => {
        await h_api(reqFuncs, setProm);
    };

    const reqApiVis = async () => {
        await h_api(reqVisP, setVisP);
    };

    useEffect(() => {
        reqApiPro();
    }, []);
    useEffect(() => {
        if (selectedPromotor != null) {
            reqApiVis();
        }
    }, [selectedPromotor]);
    { visP.length > 0 && console.log(visP, 'promotor - ', selectedPromotor.nome) }

    const handleSelectPromotor = (promotor) => {
        setSelectedPromotor(promotor); // Define o promotor selecionado quando um item é clicado
        console.log(promotor);
    };

    return (
        <div style={{ margin: '4px' }}>
            <div style={{ display: 'flex' }}>
                <h2>Visitas</h2>
                <SelProm prom={prom} handle={handleSelectPromotor} selP={selectedPromotor} />

            </div>
            {
                visP.length > 0 && visP.map((item, index) => (
                    <>
                        <p>{item.descricao} - {item.data} - {item.loja} - {item.endereco}</p>
                        <ImageComponent key={index} base64Image={item.foto} />
                    </>))
            }

        </div >
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

function ImageComponent({ base64Image }) {
    return <img  src={base64Image} alt="Imagem" />;
}