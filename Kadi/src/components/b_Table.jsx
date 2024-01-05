import React, { useState } from 'react';
import Table from 'react-bootstrap/Table';
import Container from 'react-bootstrap/Container';
import EditModal from './EditModal';

function Tabela({ col, lin, id, url }) {
  const colWidth = 100 / col.length;
  const [showModal, setShowModal] = useState(false);
  const [selectedRow, setSelectedRow] = useState({});

  const handleEditClick = (linha) => {
    setSelectedRow(linha)
    setShowModal(true);
  };
  return (
    <Container>
      <Table striped bordered hover>
        <thead>
          <tr>
            {col.map((coluna) => (
              <th key={coluna.id} style={{ width: `${colWidth}%` }}>
                {coluna.nome}
              </th>
            ))}
          </tr>
        </thead>
        <tbody>
          {lin.map((linha, index) => (
            <tr key={index}>
              {col.map((coluna) => (
                <td
                  key={linha[id] + coluna.id}
                  style={{ width: `${colWidth}%` }}
                  onClick={() => handleEditClick(linha)}
                >
                  {linha[coluna.nome]}
                </td>
              ))}
            </tr>
          ))}
        </tbody>
      </Table>
      <EditModal
        show={showModal}
        onHide={() => {setShowModal(false); location.reload()}}
        lin={selectedRow}
        col={col}
        url={ url }
      />
    </Container>
  );
}

export default Tabela;
