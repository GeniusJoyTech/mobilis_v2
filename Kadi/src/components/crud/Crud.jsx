import React, { useEffect, useState } from "react";

import h_api from "../../hook/HApi";

import Create from "./Create"
import Read from "./Read";
import UpdateDelete from "./UpdateDelete";

import Button from 'react-bootstrap/Button';


export default function Crud({ titulo, exibir, dropItem, url }) {
  const [readRoteiro, setReadRoteiro] = useState([]); //itens recebidos da base de dados
  const form = exibir.filter((item) => item.type === 'form').map((item) => item.row);
  

  //variaveis para mostrar as opções de editar atualizar e excluir linhas da tabela.
  const [selectedRow, setSelectedRow] = useState([]); // Item que o usuario seleciona manualmente

  //variaveis para exibir os componentes de edição, deletar e inclusão.
  const [showCreate, setShowCreate] = useState(false);
  const [showRead, setShowRead] = useState(false);
  const [loading, setLoading] = useState(false);
  const [showUpdateDelete, setShowUpdateDelete] = useState(false);
  const reqRoteiro = async () => {
    setLoading(true);
    await h_api(reqRot, setReadRoteiro);
    setLoading(false);
    setShowRead(true);
  };

  const reqRot = {
    method: 'GET',
    url: url.ver,
  };

  useEffect(() => {
    reqRoteiro();
  }, [url.ver]);


  function handleCloseCreate() {
    setShowCreate(false);
    setShowRead(true);
    setShowUpdateDelete(false);
    setSelectedRow([]);
  };

  function handleCreate() {
    setShowCreate(true);
    setShowRead(false);
    setShowUpdateDelete(false);
  }

  const handleSelectItem = (item) => {
    setSelectedRow(item);
    setShowCreate(false);
    setShowRead(false);
    setShowUpdateDelete(true);
  }
  function handleCloseUpdateDelete() {
    setShowCreate(false);
    setShowUpdateDelete(false);
    setShowRead(true);
    setSelectedRow([]);
  };

  //Lógica para obter dados da base de dados
  return (
    <div style={{ border: '20px solid rgba(0,0,0,0)', borderRadius: '4px' }}>
      {showRead == true ?
        <div style={{ display: 'flex', border: '8px solid rgba(0,0,0,0)' }}>
          <h2 style={{ borderLeft: '4px solid rgba(0, 0, 0, 0)', borderRight: '8px solid rgba(0, 0, 0, 0)', borderBottom: '4px solid rgba(0, 0, 0, 0)' }}><strong>{titulo}</strong></h2>
          <Button onClick={handleCreate}>Adicionar {titulo}</Button>
        </div>
        :
        null}
      {/*Inicio Logica de Inclusão CREATE*/}
      <Create
        handleCreate={handleCreate}
        open={showCreate}
        close={handleCloseCreate}
        exibir={form}
        dropItens={dropItem}
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
            data={readRoteiro}
            clickItem={handleSelectItem}
          />
      }


      {/*Logica de Edição e remoção DELETE / UPDATE*/}

      <UpdateDelete
        open={showUpdateDelete}
        close={handleCloseUpdateDelete}
        exibir={form}
        data={selectedRow}
        dropItens={dropItem}
        url={url}
      />
    </div>
  );
}