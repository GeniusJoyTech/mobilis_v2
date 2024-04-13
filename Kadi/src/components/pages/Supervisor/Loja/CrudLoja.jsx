import React, { useEffect, useState } from "react";

import h_api from "../../../../hook/HApi";

import Create from "./CreateLoja"
import Read from "../../../crud/Read";
import Update from "./UpdateLoja";
import Delete from "../../../crud/Delete";

import { Button, Form } from 'react-bootstrap';


export default function Crud({ titulo, exibir, dropItem, url }) {
  //variaveis para exibir os componentes de edição, deletar e inclusão.
  const [showCreate, setShowCreate] = useState(false);
  const [showRead, setShowRead] = useState(false);
  const [loading, setLoading] = useState(false);
  const [showUpdate, setShowUpdate] = useState(false);
  const [showDelete, setShowDelete] = useState(false);
  
  const [read, setRead] = useState([]); //itens recebidos da base de dados
  const form = exibir.filter((item) => item.type === 'form').map((item) => item.row);
  const [searchTerm, setSearchTerm] = useState(""); // estado para armazenar o termo de pesquisa


  //variaveis para mostrar as opções de editar atualizar e excluir linhas da tabela.
  const [selectedRow, setSelectedRow] = useState([]); // Item que o usuario seleciona manualmente

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

  function handleCloseCreate() {
    setShowCreate(false);
    reqRead();
    setShowRead(true);
    setShowUpdate(false);
    setShowDelete(false);
    setSelectedRow([]);
  };

  function handleCreate() {
    setShowCreate(true);
    setShowRead(false);
    setShowUpdate(false);
    setShowDelete(false);
  }

  const handleUpdateItem = (item) => {
    setSelectedRow(item);
    setShowCreate(false);
    setShowRead(false);
    setShowUpdate(true);
    setShowDelete(false);
  }
  function handleCloseUpdate() {
    setShowCreate(false);
    setShowUpdate(false);
    reqRead();
    setShowRead(true);
    setShowDelete(false);
    setSelectedRow([]);
  };

  const handleDeleteItem = (item) => {
    setSelectedRow(item);
    setShowCreate(false);
    setShowRead(false);
    setShowUpdate(false);
    setShowDelete(true);
  }
  function handleCloseDelete() {
    setShowCreate(false);
    setShowUpdate(false);
    reqRead();
    setShowRead(true);
    setShowDelete(false);
    setSelectedRow([]);
  };

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
          <h2
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
            <Button onClick={handleCreate} style={{ marginRight: '4px' }}>Adicionar {titulo}</Button>

            <Form.Control
              type="text"
              placeholder="Pesquisar..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </div>
        </div>
        :
        null}
      {/*Inicio Logica de Inclusão CREATE*/}
      <Create
        handleCreate={handleCreate}
        open={showCreate}
        close={handleCloseCreate}
        url={url.incluir}
        refresh={reqRot}
      />
      {/*Fim Logica de Inclusão */}

      {/* Inicio Logica de vizualização*/}
      {
        loading == true ?
          <p>Carregando...</p>
          :
          <Read
            open={showRead}
            exibir={exibir}
            data={filteredItems} // Exibindo itens filtrados
            Update={handleUpdateItem}
            Delete={handleDeleteItem}
          />
      }


      {/*Logica de Edição e remoção DELETE e UPDATE*/}

      <Update
        open={showUpdate}
        close={handleCloseUpdate}
        exibir={form}
        data={selectedRow}
        dropItens={dropItem}
        url={url}
      />
      <Delete
        open={showDelete}
        close={handleCloseDelete}
        data={selectedRow}
        url={url}
      />
    </div>
  );
}
