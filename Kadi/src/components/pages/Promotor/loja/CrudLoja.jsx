import React, { useEffect, useState } from "react";

import h_api from "../../../../hook/HApi";
import '../promotor.css';

import Read from './Read';
import {  Form } from 'react-bootstrap';


export default function Crud({ titulo, exibir, url }) {
  const [showRead, setShowRead] = useState(false);
  const [loading, setLoading] = useState(false);
  
  const [searchTerm, setSearchTerm] = useState(""); // estado para armazenar o termo de pesquisa
  const [read, setRead] = useState([]); //itens recebidos da base de dados
  
  const reqRead = async () => {
    setLoading(true);
    await h_api(reqRot, setRead);
    setLoading(false);
    setShowRead(true);
  };

  const reqRot = {
    method: 'GET',
    url: url.ver,
  };

  useEffect(() => {
    reqRead();
  }, [url.ver]);

  // Função para filtrar os itens com base no termo de pesquisa
  const filteredItems = read.filter(item =>
    Object.values(item).some(val =>
      typeof val === "string" && val.toLowerCase().includes(searchTerm.toLowerCase())
    )
  );

  
  
  
  //Lógica para obter dados da base de dados
  return (
    <div
      style={{ border: '20px solid rgba(0,0,0,0)', borderRadius: '4px' }}
    >
      {showRead == true ?
        <div
          style={{
            display: 'flex',
            alignItems: 'center',
            border: '8px solid rgba(0,0,0,0)'
          }}>
          <h2 className='label'
            style={{
              borderLeft: '4px solid rgba(0, 0, 0, 0)',
              borderRight: '8px solid rgba(0, 0, 0, 0)',
              borderBottom: '4px solid rgba(0, 0, 0, 0)'
            }}>
            <strong>{titulo}</strong></h2>
          <div
            style={{
              display: 'flex',
              alignItems: 'center',
              width:'100%'
            }}
          >

            <Form.Control className='control'
              type="text"
              placeholder="Pesquisar..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </div>
        </div>
        :
        null}
      
      {
        loading == true ?
          <p>Carregando...</p>
          :
          <Read
            open={showRead}
            exibir={exibir}
            data={filteredItems} // Exibindo itens filtrados
            url={url}
          />
      }

    </div>
  );
}
