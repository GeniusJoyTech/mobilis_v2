import React from 'react';
import Incluir from '../../assets/Incluir';
import Listar from './Listar';
const Mercado = () => {
    const valores = {
        nome: '',
        endereco: '',
    };

    return (
        <>
            <div>
                <Incluir 
                campos={valores}
                url={'https://localhost:5000/sup/mercado/incluir'}
            />
            </div>
            <Listar
            urlFetch="https://localhost:5000/sup/mercado/ver"
            columns={[
              { label: 'Loja', width: 50 },
              { label: 'Endereço', width: 50 },
            ]}
            tagKey="id_loja"
            itemsToMap={["nome", "endereco"]}
           />
        </>
    );
};

export default Mercado;