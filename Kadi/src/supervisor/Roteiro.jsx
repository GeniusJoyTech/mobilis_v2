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
        { id: 0, nome: 'funcionário'},
        { id: 1, nome: 'cargo'},
        { id: 2, nome: 'cracha'},
        { id: 3, nome: 'superior'},
        { id: 4, nome: 'visita'},
        { id: 5, nome: 'ciclo' },
        { id: 6, nome: 'loja' },
        { id: 7, nome: 'endereco' },
      ]}
      url={urls}
    />
  );
};

export default Roteiro;
