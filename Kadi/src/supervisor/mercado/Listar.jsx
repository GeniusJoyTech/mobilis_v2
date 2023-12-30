import React, { useState, useEffect } from 'react';
import Table from 'react-bootstrap/Table';
import Container from 'react-bootstrap/Container';
import Pagination from 'react-bootstrap/Pagination';
import Spinner from 'react-bootstrap/Spinner';
import getAuthToken from '../../utils/authorization';

function Listar({ urlFetch, columns, tagKey, itemsToMap }) {
  const [loja, setLoja] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [isLoading, setIsLoading] = useState(true);
  const itemsPerPage = 5;

  const fetchData = async () => {
    try {
      setIsLoading(true);

      const token = getAuthToken();

      const response = await fetch(urlFetch, {
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
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  const handlePageChange = (page) => {
    setCurrentPage(page);
  };

  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentItems = loja.slice(indexOfFirstItem, indexOfLastItem);

  return (
    <Container style={{ position: 'relative', minHeight: '100vh' }}>
      {isLoading && (
        <div
          style={{
            position: 'absolute',
            top: '50%',
            left: '50%',
            transform: 'translate(-50%, -50%)',
          }}
        >
          <Spinner animation="border" role="status">
          </Spinner>
          <p>Carregando...</p>
        </div>
      )}

      {!isLoading && (
        <>
          <Table striped bordered hover style={{ width: '100%' }}>
            <thead>
              <tr>
                {columns.map((column, index) => (
                  <th key={index} style={{ width: `${column.width}%` }}>{column.label}</th>
                ))}
              </tr>
            </thead>
            <tbody>
              {currentItems.map((item) => (
                <tr key={item[tagKey]}>
                  {itemsToMap.map((mapKey, index) => (
                    <td key={index}>{item[mapKey]}</td>
                  ))}
                </tr>
              ))}
            </tbody>
          </Table>

          <Pagination>
            {Array.from({ length: Math.ceil(loja.length / itemsPerPage) }).map((_, index) => (
              <Pagination.Item
                key={index + 1}
                active={index + 1 === currentPage}
                onClick={() => handlePageChange(index + 1)}
              >
                {index + 1}
              </Pagination.Item>
            ))}
          </Pagination>
        </>
      )}
    </Container>
  );
}

export default Listar;
