import React from 'react';
import Principal from '../components/Principal';

const Roteiro = () => {
  const urls = {
    ver: 'https://localhost:5000/sup/roteiro/ver',
    editar: 'https://localhost:5000/sup/roteiro/editar',
    deletar: 'https://localhost:5000/sup/roteiro/deletar',
    incluir: 'https://localhost:5000/sup/roteiro/incluir',
  };

  return (
    <Principal
      id={'id_roteiro'}
      col={[
        { id: 0, tipo:'form', nome: 'funcionário'},
        { id: 1, tipo:'form', nome: 'cargo'},
        { id: 2, tipo:'form', nome: 'cracha'},
        { id: 3, tipo:'form', nome: 'superior'},
        { id: 4, tipo:'form', nome: 'visita'},
        { id: 5, tipo:'form', nome: 'ciclo' },
        { id: 6, tipo:'form', nome: 'loja' },
        { id: 7, tipo:'form', nome: 'endereco' },
      ]}
      url={urls}
    />
  );
};

export default Roteiro;
