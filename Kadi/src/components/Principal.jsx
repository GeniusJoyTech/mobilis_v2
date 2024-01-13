import React, { useEffect, useState } from 'react';
import h_api from '../hook/HApi';
import Tabela from './Tabela';
import Carregamento from './Carregamento';
import Logout from '../usuario/Logout';

const Principal = ({ id, col, url }) => {
  

  const [data, setData] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  const reqVis = {  
    method: 'GET',
    url: url.ver,
  };

  useEffect(() => {
    const loading = async () => {
      await h_api(reqVis, setData);
      setIsLoading(false);
    };
    loading();
  }, []);

  return (
    <>
    <Logout/>
      {isLoading ? (
        <Carregamento />
      ) : (
        <Tabela col={col} lin={data} id={id} url={{
          edit: url.editar,
          del: url.deletar,
          incluir: url.incluir,
        }} />
      )}
    </>
  );
};

export default Principal;
