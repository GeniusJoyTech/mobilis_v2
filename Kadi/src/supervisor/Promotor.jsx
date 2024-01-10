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
        { id: 0, nome: 'nome' },
        { id: 1, nome: 'cargo' },
        { id: 2, nome: 'cracha' },
        { id: 3, nome: 'superior' },
        { id: 4, nome: 'endereco' },
        { id: 5, nome: 'status' },
        { id: 6, nome: 'email' },
      ]}
      url={urls}
    />
  );
};

export default Promotor;
