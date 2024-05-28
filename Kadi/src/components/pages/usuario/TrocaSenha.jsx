import React, { useState } from 'react';
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import backUrl from '../../../../config';
import './login.css'

const TrocaSenha = ({setTroca}) => {
  const [email, setEmail] = useState('');
  const [message, setMessage] = useState('');

  const handleSubmit = async (event) => {
    event.preventDefault();

    try {
      const response = await fetch(`${backUrl}senha/editar`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ email }),
      });

      if (!response.ok) {
        throw new Error(`Erro na requisição: ${response.status}`);
      }

      const data = await response.json();
      setMessage('Instruções para troca de senha foram enviadas para seu email.');

    } catch (error) {
      console.error('Erro na requisição:', error);
      setMessage('Erro ao enviar o email. Tente novamente.');
    }
  };

  return (
    <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', marginTop: '25vh' }}>
      <h1 className='h1'>Troca de senha</h1>
      <Form onSubmit={handleSubmit}>
        <Form.Group className="mb-3" controlId="formBasicEmail" style={{textAlign: 'center'}}>
          <Form.Control className='control'
            type="email"
            placeholder="Entre com email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            autoComplete="email"
            name="email"
          />
          <Form.Text className='text-muted label2' onClick={()=>{setTroca(false)}}>
            Voltar
          </Form.Text>
        </Form.Group>

        <Button className='label2' variant="primary" type="submit">
          Enviar
        </Button>
      </Form>
      {message && <p>{message}</p>}
    </div>
  );
};

export default TrocaSenha;
