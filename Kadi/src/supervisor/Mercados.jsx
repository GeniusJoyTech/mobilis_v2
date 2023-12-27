import React, { useState, useEffect } from 'react';
import Table from 'react-bootstrap/Table';
import Container from 'react-bootstrap/Container';

import getAuthToken from '../utils/authorization';
import Mercado from './Mercado';

function Mercados() {
  const [loja, setLoja] = useState([]);

  const fetchData = async () => {
    try {
      const token = getAuthToken();

      const response = await fetch('https://localhost:5000/sup/mercado/ver', {
        method: 'get',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `${token}`,
        },
      });

      if (!response.ok) {
        throw new Error(`Erro na requisição: ${response.status}`);
      }

      const data = await response.json();
      setLoja(data);
    } catch (error) {
      console.error('Erro na requisição:', error);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  const handleButtonClick = () => {
    fetchData();
  };

  return (
    <Container>
        <Table striped bordered hover>
      <thead>
        <tr>
          <th>Loja</th>
          <th>Endereço</th>
        </tr>
      </thead>
      <tbody>
        {loja.map((item) => (
          <tr key={item.id}>
            <td>{item.nome}</td>
            <td>{item.endereco}</td>
          </tr>
        ))}
      </tbody>
    </Table>
    </Container>
  );
}

export default Mercados;
