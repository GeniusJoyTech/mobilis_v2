import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import React, { useState } from 'react';

const NovaSenha = () => {
  const [token, setToken] = useState('');
  const [password, setPassword] = useState('');
  const handleSubmit = async (event) => {
    event.preventDefault();

    await fetch('https://localhost:5000/nova/senha', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        token: token,
        senha: password,
      }),
    }).then(response => {
      if (!response.ok) {
        console.log(response);
        throw new Error(`Erro na requisição: ${response.status}`);
      }

      return response.json();
    })
  };

  return (
    <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', marginTop: '25vh' }}>
      <Form onSubmit={handleSubmit}>
        <Form.Group className="mb-3" controlId="formBasicEmail">
          <Form.Control
            type="text"
            placeholder="Entre com o token"
            value={token}
            onChange={(e) => setToken(e.target.value)}
            name="token"
          />
          <Form.Text className="text-muted">
            Não compartilhe seu token com terceiros.
          </Form.Text>
        </Form.Group>

        <Form.Group className="mb-3" controlId="formBasicPassword">
          <Form.Label>Senha</Form.Label>
          <Form.Control
            type="password"
            placeholder="Senha"
            autoComplete="current-password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
        </Form.Group>

        <Button variant="primary" type="submit">
          Enviar
        </Button>
      </Form>
    </div>
  );
}
export default NovaSenha;