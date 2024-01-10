import React from 'react';
import Principal from '../components/Principal';

const Promotor = () => {
  const urls = {
    ver: 'https://localhost:5000/sup/promotor/ver',
    editar: 'https://localhost:5000/sup/promotor/editar',
    deletar: 'https://localhost:5000/sup/promotor/deletar',
    incluir: 'https://localhost:5000/sup/promotor/incluir',
  };

  return (
    <Principal
      id={'id_usu'}
      col={[
        { id: 0, nome: 'nome', tipo: 'form' },
        { id: 1, nome: 'cargo', tipo: 'form' },
        { id: 2, nome: 'cracha', tipo: 'form' },
        { id: 3, nome: 'superior', tipo: 'list'},
        /*
          Eu quero criar um json que eu consiga fazer uma relação
          em lista onde o usuario verá um dropdown com o ... nome - cracha ...
          dos supervisores, mas nos panos será enviado à api apenas o crachá
          Caso não exista relação mantem-se tudo como está, sem aparecer nada
        */
        { id: 4, nome: 'cracha_sup', tipo: 'list' },
        { id: 5, nome: 'endereco', tipo: 'form' },
        { id: 6, nome: 'status', tipo: 'form' },
        { id: 7, nome: 'email', tipo: 'form' },
      ]}
      url={urls}
    />
  );
};

export default Promotor;
