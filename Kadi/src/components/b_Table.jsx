import React from 'react';
import Table from 'react-bootstrap/Table';
import Container from 'react-bootstrap/Container';

function Tabela({ col, lin, id, reqEdit}) {
  const colWidth = 100 / col.length; // Calcula a largura de cada coluna

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
                <td key={linha[id] + coluna.id} style={{ width: `${colWidth}%` }}>
                  {linha[coluna.nome]}
                </td>
              ))}
            </tr>
          ))}
        </tbody>
      </Table>
    </Container>
  );
}

export default Tabela;
