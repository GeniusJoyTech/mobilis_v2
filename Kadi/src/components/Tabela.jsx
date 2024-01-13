import React, { useState, useEffect } from 'react';
import { Container, Table, Navbar, NavbarBrand, Button } from 'react-bootstrap';
import Paginacao from './PaginationComponent';
import Pesquisa from './Pesquisa';
import Editar from './Editar';
import Incluir from './Incluir';

function Tabela({ col, lin, id, url }) {
  
  const [list, setList] = useState([]);
  const [form, setForm] = useState([]);

  useEffect(() => {
    const novoList = lin.map(l => {
      let novoItem = {};
      col.forEach(c => {
        if (c.tipo === 'list' && l[c.nome] !== undefined && l[c.nome] !== null) {
          novoItem[c.nome] = l[c.nome];
        }
      });
      return novoItem;
    });
    setList(novoList.filter(objeto => Object.keys(objeto).some(chave => objeto[chave] !== '')));
    
    const novoForm = lin.map(l => {
      let novoItem = {};
      col.forEach(c => {
        if (c.tipo === 'form' && l[c.nome] !== undefined && l[c.nome] !== null) {
          novoItem[c.nome] = l[c.nome];
        }
      });
      return novoItem;
    });
    setForm(novoForm.filter(objeto => Object.keys(objeto).some(chave => objeto[chave] !== '')));
    
  }, []);
/*

  console.log(list);
  console.log(form);
*/
  
  const itemsPorPag = 10;
  const largCol = 100 / col.length;
  const [showEditModal, setShowEditModal] = useState(false);
  const [showIncludeModal, setShowIncludeModal] = useState(false);
  const [selectedRow, setSelectedRow] = useState({});
  const [currentPage, setCurrentPage] = useState(1);
  const [searchTerm, setSearchTerm] = useState('');

  const handleEditClick = (linha) => {
    setSelectedRow(linha);
    setShowEditModal(true);
  };
  const handleIncludeClick = () => {
    setShowIncludeModal(true);
  };
  const handleSearchChange = (event) => {
    setSearchTerm(event.target.value);
    setCurrentPage(1);
  };
  const indexOfLastItem = currentPage * itemsPorPag;
  const indexOfFirstItem = indexOfLastItem - itemsPorPag;
  const filteredLin = lin.filter((linha) => {
    const values = Object.values(linha);
    return values.some((value) => {
      return value != null && value.toString().toLowerCase().includes(searchTerm.toLowerCase());
    });
  });
  const currentItems = filteredLin.slice(indexOfFirstItem, indexOfLastItem);
  const paginate = (pageNumber) => setCurrentPage(pageNumber);
  return (
    <>
      <Container>
        <Navbar>
          <NavbarBrand>Pesquisar</NavbarBrand>
          <Pesquisa searchTerm={searchTerm} onSearchChange={handleSearchChange} />
          <Button style={{ marginLeft: '8px' }} variant="primary" onClick={() => handleIncludeClick()}>
            Incluir
          </Button>
        </Navbar>

        <Table striped bordered hover>
          <thead>
            <tr>
              {col.map((coluna) => (
                <th key={coluna.id} style={{ width: `${largCol}%` }}>
                  {coluna.nome}
                </th>
              ))}
            </tr>
          </thead>
          <tbody>
            {currentItems.map((linha, index) => (
              <tr key={index}>
                {col.map((coluna) => (
                  <td
                    key={linha[id] + coluna.id}
                    style={{ width: `${largCol}%` }}
                    onClick={() => handleEditClick(linha)}
                  >
                    {linha[coluna.nome]}
                  </td>
                ))}
              </tr>
            ))}
          </tbody>
        </Table>
        <Paginacao
          lin={filteredLin}
          itemsPerPage={itemsPorPag}
          currentPage={currentPage}
          paginate={paginate}
        />
        <Editar
          show={showEditModal}
          onHide={() => {
            setShowEditModal(false);
            setCurrentPage(1);
          }}
          row={selectedRow}
          col={col}
          url={url}
        />
        <Incluir
          show={showIncludeModal}
          onHide={() => {
            setShowIncludeModal(false);
            setCurrentPage(1);
          }
          }
          col={col}
          url={url.incluir}
        />
      </Container>
    </>
  );
}

export default Tabela;