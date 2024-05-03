import React, { useEffect, useState } from "react";
import h_api from "../../../hook/HApi";
import { Dropdown, Form } from 'react-bootstrap/';
import backUrl from '../../../../config'

export default function Visitas() {
  const [prom, setProm] = useState([]);
  const [visP, setVisP] = useState([]);
  const [selectedPromotor, setSelectedPromotor] = useState(null);
  const [date1, setDate1] = useState(null);
  const [date2, setDate2] = useState(null);

  const reqFuncs = {
    method: "GET",
    url: backUrl + 'sup/promotor/ver',
  };

  const reqVisP = {
    method: "POST",
    url: backUrl + 'sup/pro/visitas/ver',
    body: { ...selectedPromotor, date1, date2 },
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
    setVisP([]);
    if (selectedPromotor || date1 || date2) {
      reqApiVis();
    }
  }, [selectedPromotor, date1, date2]);

  const handleSelectPromotor = (promotor) => {
    setSelectedPromotor(promotor);
  };

  const handleDateChange = (event) => {
    const { name, value } = event.target;
    if (name === 'date1') {
      setDate1(value);
    } else if (name === 'date2') {
      setDate2(value);
    }
  };

  return (
    <div style={{ margin: '4px' }}>
      <div>
        <div style={{padding: '2px', border:'solid 1px'}}>
          <h2>Visitas</h2>
          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-evenly' }}>
            <SelProm prom={prom} handle={handleSelectPromotor} selP={selectedPromotor} />
            <Form style={{ display: 'flex' }}>
              <Form.Group key='0' className="mb-3" controlId="date1">
                <Form.Label>De:</Form.Label>
                <Form.Control type="date" name="date1" placeholder={date1} onChange={handleDateChange} />
              </Form.Group>
              <Form.Group key='1' className="mb-3" controlId="date2">
                <Form.Label>Até:</Form.Label>
                <Form.Control type="date" name="date2" placeholder={date2} onChange={handleDateChange} />
              </Form.Group>
            </Form>
          </div>

        </div>

        {visP.length > 0 && visP.map((item, index) => (
          <div key={index} >
            <p>{item.descricao} - {item.data} - {item.loja} - {item.rua}</p>
            <ImageComponent key={index} base64Image={item.foto} />
            <p>Observação do promotor: {item.observacao}</p>
          </div>
        ))}
      </div>
    </div>
  );
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
  return <img src={base64Image} alt="Imagem" />;
}
