import React, { useState, useEffect } from 'react';
import { Container, Table, Navbar, NavbarBrand, Button } from 'react-bootstrap';
import Paginacao from './PaginationComponent';
import Pesquisa from './Pesquisa';
import Editar from './Editar';
import Incluir from './Incluir';

function Tabela({ col, lin, id, url }) {
  const [list, setList] = useState([]);
  const [form, setForm] = useState([]);
  const [showEditModal, setShowEditModal] = useState(false);
  const [showIncludeModal, setShowIncludeModal] = useState(false);
  const [selectedRow, setSelectedRow] = useState({});
  const [currentPage, setCurrentPage] = useState(1);
  const [searchTerm, setSearchTerm] = useState('');

  useEffect(() => {
    setList(formatarDados(lin, col, 'list'));
    setForm(col.filter(coluna => coluna.tipo === 'form' ).map(({ tipo, ...rest }) => rest));
  }, []);

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

  const indexOfLastItem = currentPage * 10;
  const indexOfFirstItem = indexOfLastItem - 10;

  const filteredLin = lin.filter(linha => {
    const values = Object.values(linha);
    return values.some(value =>
      value != null && value.toString().toLowerCase().includes(searchTerm.toLowerCase())
    );
  });

  const currentItems = filteredLin.slice(indexOfFirstItem, indexOfLastItem);

  const paginate = (pageNumber) => setCurrentPage(pageNumber);

  function getKeysCount(obj) {
    return Object.keys(obj).length;
  }
  
  function filterObjectsWithMaxKeys(list) {
    const maxKeysCount = Math.max(...list.map(getKeysCount));
  
    return list.filter(obj => getKeysCount(obj) === maxKeysCount);
  }
  const filteredList = filterObjectsWithMaxKeys(list);
  return (
    <>
      <Container>
        <Navbar>
          <NavbarBrand>Pesquisar</NavbarBrand>
          <Pesquisa searchTerm={searchTerm} onSearchChange={handleSearchChange} />
          <Button style={{ marginLeft: '8px' }} variant="primary" onClick={handleIncludeClick}>
            Incluir
          </Button>
        </Navbar>

        <Table striped bordered hover>
          <thead>
            <tr>
              {col.map((coluna) => (
                <th key={coluna.id} style={{ width: `${100 / col.length}%` }}>
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
                    style={{ width: `${100 / col.length}%` }}
                    onClick={() => handleEditClick(linha)}
                  >
                    {linha[coluna.nome]}
                  </td>
                ))}
              </tr>
            ))}
          </tbody>
        </Table>
        <Paginacao lin={filteredLin} itemsPerPage={10} currentPage={currentPage} paginate={paginate} />
        <Editar
          show={showEditModal}
          onHide={() => {
            setShowEditModal(false);
            setCurrentPage(1);
          }}
          row={selectedRow}
          col={col}
          url={url}
          list={list.length ? filteredList : null}
          form={form.length ? form : null}
        />
        <Incluir
          show={showIncludeModal}
          onHide={() => {
            setShowIncludeModal(false);
            setCurrentPage(1);
          }}
          col={col}
          list={list.length ? filteredList : null}
          form={form.length ? form : null}
          url={url.incluir}
        />
      </Container>
    </>
  );
}

export default Tabela;


function formatarDados(dados, colunas, tipo) {
  const novoArray = dados.map(item => {
    let novoItem = {};
    colunas.forEach(coluna => {
      if (coluna.tipo === tipo && item[coluna.nome] !== undefined && item[coluna.nome] !== null) {
        novoItem[coluna.nome] = item[coluna.nome];
      }
    });
    return novoItem;
  });

  const arraySemDuplicatas = novoArray.filter((objeto, index, self) =>
    index === self.findIndex(t => JSON.stringify(t) === JSON.stringify(objeto))
  );

  return arraySemDuplicatas.filter(objeto => Object.keys(objeto).some(chave => objeto[chave] !== ''));
}
