import React from 'react';
import Table from 'react-bootstrap/Table';
import Container from 'react-bootstrap/Container';
import Pagination from 'react-bootstrap/Pagination';
import LoadingContainer from '../assets/Carregamento';
import Editar from './Editar';

function Listar({ urlEdit, urlDel, token, dados, currentPage, isLoading, handlePageChange, columns, tagKey, itemsToMap }) {
  const itemsPerPage = 10;
  const [selectedItem, setSelectedItem] = React.useState(null);
  const [id, setId] = React.useState(null);

  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentItems = dados.slice(indexOfFirstItem, indexOfLastItem);

  const openEditModal = (item) => {
    const itemFilter = {};
    const labels = columns.map(column => column.label);
    labels.forEach(label => {
      if (item[label] !== undefined) {
        itemFilter[label] = item[label];
      }
    });
    setId({id: item[tagKey]});
    setSelectedItem(itemFilter);
  };

  const closeEditModal = () => {
    setSelectedItem(null);
  };

  return (
    <>
      <Editar
        campos={selectedItem}
        id={id}
        urlEdit={urlEdit}
        urlDel={urlDel}
        token={token}
        show={selectedItem !== null}
        handleClose={closeEditModal}
      />
      <Container style={{ position: 'relative', minHeight: '100vh' }}>
        {isLoading && <LoadingContainer />}

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
                  <tr key={item[tagKey]} onClick={() => openEditModal(item)}>
                    {itemsToMap.map((mapKey, index) => (
                      <td key={index}>{item[mapKey]}</td>
                    ))}
                  </tr>
                ))}
              </tbody>
            </Table>

            <Pagination>
              {Array.from({ length: Math.ceil(dados.length / itemsPerPage) }).map((_, index) => (
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
    </>
  );
}

export default Listar;
