import React, { useEffect, useState } from "react";
import h_api from "../../../hook/HApi";
import { Dropdown, Form, Accordion, Button } from 'react-bootstrap/';
import backUrl from '../../../../config'

export default function Visitas() {
  const [prom, setProm] = useState([]);
  const [ljs, setLjs] = useState([]);
  const [atv, setAtv] = useState([]);
  const [sendAtv, setSendAtv] = useState([]);
  const [visP, setVisP] = useState([]);
  const [enviando, setEnviando] = useState(false);
  const [selectedPromotor, setSelectedPromotor] = useState(null);
  const [selectedLoja, setSelectedLoja] = useState(null);
  const [date1, setDate1] = useState(null);
  const [date2, setDate2] = useState(null);

  const reqFuncs = {
    method: "GET",
    url: backUrl + 'sup/promotor/ver',
  };
  const reqLjs = {
    method: "GET",
    url: backUrl + 'sup/mercado/ver',
  };

  const reqAtv = {
    method: "GET",
    url: backUrl + 'sup/atv/ver',
  };

  const reqVisP = {
    method: "POST",
    url: backUrl + 'sup/pro/visitas/ver',
    body: { ...selectedPromotor, ...selectedLoja, date1, date2, sendAtv },
  };

  const reqApiPro = async () => {
    await h_api(reqFuncs, setProm);
  };
  const reqApiLojas = async () => {
    await h_api(reqLjs, setLjs);
  };

  const reqApiAtv = async () => {
    await h_api(reqAtv, setAtv);
  };

  const reqApiVis = async () => {
    await h_api(reqVisP, setVisP);
  };

  useEffect(() => {
    reqApiPro();
    reqApiLojas();
    reqApiAtv();
  }, []);

  const handleSelectPromotor = (promotor) => {
    setSelectedPromotor(promotor);
  };
  const handleSelectLoja = (loja) => {
    setSelectedLoja(loja);
  };
  const handleCheckboxChange = (id_atividade, checked) => {
    setSendAtv(selecionado => {
      if (checked) {
        return [...selecionado, id_atividade];
      } else {
        return selecionado.filter(id => id !== id_atividade);
      }
    });
  };
  const handleDateChange = (event) => {
    const { name, value } = event.target;
    if (name === 'date1') {
      setDate1(value);
    } else if (name === 'date2') {
      setDate2(value);
    }
  };
  const handleReqVisitas = async () => {
    setEnviando(true);
    setVisP([]);
    await reqApiVis();
    setEnviando(false);
  }

  return (
    <div style={{ margin: '4px' }}>
      <h2>Visitas</h2>
      <div>
        <Accordion defaultActiveKey={['0']} alwaysOpen>
          <Accordion.Item eventKey="0">
            <Accordion.Header>
              Filtros
            </Accordion.Header>
            <Accordion.Body>
              <div>
                <div style={{ display: 'flex', justifyContent: 'space-around', margin: '8px 0px 8px 0px' }}>
                  <SelProm prom={prom} handle={handleSelectPromotor} selP={selectedPromotor} />
                  <SelLoja loja={ljs} handle={handleSelectLoja} selL={selectedLoja} />

                </div>
                <Form >
                  <div style={{ textAlign: 'center' }}><Form.Label>Periodo</Form.Label></div>
                  <div style={{ display: 'flex', justifyContent: 'space-around', alignItems: 'flex-start' }}>

                    <Form.Group key='0' className="mb-3" controlId="date1">
                      <Form.Label>De:</Form.Label>
                      <Form.Control type="date" name="date1" placeholder={date1} onChange={handleDateChange} />
                    </Form.Group>
                    <Form.Group key='1' className="mb-3" controlId="date2">
                      <Form.Label>Até:</Form.Label>
                      <Form.Control type="date" name="date2" placeholder={date2} onChange={handleDateChange} />
                    </Form.Group>

                  </div>

                  <Form.Group key='2' style={{ marginLeft: '4px' }} className="mb-3" controlId="atividade">
                    <div style={{ textAlign: 'center' }}><Form.Label>Atividades</Form.Label></div>
                    <div style={{ display: 'flex', justifyContent: 'space-evenly' }}>
                      {
                        atv.map(a => (
                          <Form.Check
                            key={a.id_atividade}
                            type="checkbox"
                            label={a.descricao}
                            onChange={(e) => handleCheckboxChange(a.id_atividade, e.target.checked)}
                          />
                        ))
                      }

                    </div>
                    <div style={{ textAlign: 'center' }}>
                      <Button onClick={handleReqVisitas} disabled={enviando}>Ver visitas</Button>

                    </div>
                  </Form.Group>
                </Form>
              </div>
            </Accordion.Body>

          </Accordion.Item>

        </Accordion>

        <div style={{ textAlign: 'center', marginTop: '8px' }}>
          {visP.length > 0 && visP.map((item, index) => (
            <div key={index} >
              <p>{item.descricao} - {item.data} - {item.loja} - {item.rua}</p>
              <ImageComponent key={index} base64Image={item.foto} />
              <p>Observação do promotor: {item.observacao}</p>
            </div>
          ))}
        </div>
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
        <Dropdown.Item key={0} onClick={() => handle(null)}>
          Selecione um promotor
        </Dropdown.Item>
        {prom.map((item, index) => (
          <Dropdown.Item key={index} onClick={() => handle(item)}>
            {item.nome} - {item.cracha}
          </Dropdown.Item>
        ))}
      </Dropdown.Menu>
    </Dropdown>
  );
}
function SelLoja({ loja, handle, selL }) {
  return (
    <Dropdown>
      <Dropdown.Toggle id="dropdown-basic">
        {selL ? `${selL.loja} - ${selL.rua} - ${selL.numero}` : "Selecione uma Loja"}
      </Dropdown.Toggle>
      <Dropdown.Menu>
        <Dropdown.Item key={0} onClick={() => handle(null)}>
          Selecione uma loja
        </Dropdown.Item>
        {loja.map((item, index) => (
          <Dropdown.Item key={index} onClick={() => handle(item)}>
            {item.loja} - {item.rua} - {item.numero}
          </Dropdown.Item>
        ))}
      </Dropdown.Menu>
    </Dropdown>
  );
}

function ImageComponent({ base64Image }) {
  return <img src={base64Image} alt="Imagem" />;
}
