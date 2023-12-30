import React, { useState, useEffect } from 'react';
import Table from 'react-bootstrap/Table';
import Container from 'react-bootstrap/Container';
import Pagination from 'react-bootstrap/Pagination';
import Spinner from 'react-bootstrap/Spinner';

function Listar({ data, columns, tagKey, itemsToMap }) {
  const [currentPage, setCurrentPage] = useState(1);
  const [isLoading, setIsLoading] = useState(true);
  const itemsPerPage = 5;

  useEffect(() => {
    setIsLoading(false);
  }, [data]);

  const handlePageChange = (page) => {
    setCurrentPage(page);
  };

  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentItems = data.slice(indexOfFirstItem, indexOfLastItem);

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
          <Spinner animation="border" role="status"></Spinner>
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
            {Array.from({ length: Math.ceil(data.length / itemsPerPage) }).map((_, index) => (
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
