import React from 'react';
import Principal from '../components/Principal';

const Mercado = () => {
  const urls = {
    ver: 'https://localhost:5000/sup/mercado/ver',
    editar: 'https://localhost:5000/sup/mercado/editar',
    deletar: 'https://localhost:5000/sup/mercado/deletar',
    incluir: 'https://localhost:5000/sup/mercado/incluir',
  };

  return (
    <Principal
      id={'id_loja'}
      col={[{ id: 0, nome: 'nome' }, { id: 1, nome: 'endereco' }]}
      url={urls}
    />
  );
};

export default Mercado;
