import React, { useEffect, useState } from 'react';
import h_api from '../../hook/HApi';
import Tabela from '../../components/b_Table';
import Carregamento from '../../assets/Carregamento';

const Mercado = () => {
  const [data, setData] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  const id = 'id_loja';// id da base de dados, alterar conforme o tipo de requisição
  const col = [{ id: 0, nome: 'nome' }, { id: 1, nome: 'endereco' }];//colunas que seão visiveis para o usuario
  const reqVis = { //requisição de visualização para a api 
    method: 'GET',
    url: 'https://localhost:5000/sup/mercado/ver',
  };
  const reqEdt = { //requisição de visualização para a api 
    method: 'POST',
    url: 'https://localhost:5000/sup/mercado/editar',
  };
//metodo para exibir componente de carregamento quando o sistema estiver aguardando a requisição à base de dados.
  useEffect(() => {
    const loading = async () => {
        await h_api(reqVis, setData);//h_api já realiza um tratamento de erros.
        setIsLoading(false);
    };
    loading();
  }, []);

  return (
    <>
      {isLoading ? (
        <Carregamento />
      ) : (
        <Tabela col={col} lin={data} id={id} reqEdit={reqEdt} />
      )}
    </>
  );
};

export default Mercado;
