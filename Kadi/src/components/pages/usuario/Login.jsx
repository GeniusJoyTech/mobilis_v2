import React, { useState } from 'react';
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';

const Login = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const handleSubmit = async (event) => {
    event.preventDefault();

    await fetch('https://localhost:5000/Login', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        email: email,
        senha: password,
      }),
    }).then(response => {
      if (!response.ok) {
        console.log(response);
        throw new Error(`Erro na requisição: ${response.status}`);
      }

      return response.json();
    })
      .then(data => {
        const jwtToken = data.token;

        document.cookie = `Authorization=${jwtToken}; path=/;`;
      })
      .catch(error => {
        console.error('Erro na requisição:', error);
      });
  };


  return (
    <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', marginTop: '25vh' }}>
      <Form onSubmit={handleSubmit}>
        <Form.Group className="mb-3" controlId="formBasicEmail">
          <Form.Control
            type="email"
            placeholder="Entre com email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            autoComplete="email"
            name="email"
          />
          <Form.Text className="text-muted">
            Nós nunca compartilharemos seu email com terceiros.
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
};

export default Login;