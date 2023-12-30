import React, { useState, useEffect } from 'react';
import Incluir from '../../components/Incluir';
import Listar from '../../components/Listar';
import getAuthToken from '../../utils/authorization';

const Mercado = () => {
  const [loja, setLoja] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [isLoading, setIsLoading] = useState(true);
  const valores = {
    nome: '',
    endereco: '',
  };
  const token = getAuthToken();
  const urlFetch = 'https://localhost:5000/sup/mercado/ver';
  const fetchData = async () => {
    try {
      setIsLoading(true);

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

  return (
    <>
      <div style={{ display:'flex', alignItems:'center'}}>
        <h2>Mercados</h2>
        <Incluir
          campos={valores}
          url={'https://localhost:5000/sup/mercado/incluir'}
          token={token}
        />
      </div>
      <Listar
      urlEdit={'https://localhost:5000/sup/mercado/editar'}
      urlDel={'https://localhost:5000/sup/mercado/deletar'}
      token={token}
        dados={loja}
        currentPage={currentPage}
        isLoading={isLoading}
        handlePageChange={handlePageChange}
        columns={[
          { label: 'nome', width: 50 },
          { label: 'endereco', width: 50 },
        ]}
        tagKey="id_loja"
        itemsToMap={["nome", "endereco"]}
      />
    </>
  );
};

export default Mercado;
