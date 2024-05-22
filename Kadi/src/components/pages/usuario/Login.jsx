import React, { useState, useEffect } from 'react';
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import getAuthToken from '../../../utils/authorization';
import TrocaSenha from './TrocaSenha';
import backUrl from '../../../../config'

const Login = () => {
  const [log, setLog] = useState(true);
  const [troca, setTroca] = useState(false);
  return (
    <>
      <Fundo
        x={
          <>
            {log && <Log />}
            {troca && <TrocaSenha/>}
          </>
        }
      />

    </>
  );
}
const Log = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  useEffect(() => {
    // Verifica se o usuário já está autenticado ao montar o componente
    const authToken = getAuthToken();
    if (authToken) {
      window.location.href = '/pro';
    }
  }, []);

  const handleSubmit = async (event) => {
    event.preventDefault();

    await fetch(backUrl+'Login', {
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

        // Redireciona o usuário após o login bem-sucedido
        window.location.href = '/pro';
      })
      .catch(error => {
        console.error('Erro na requisição:', error);
      });
  };

  return (

    <div style={{ marginTop: '25vh' }}>
      <h1>Login</h1>
      <div
        style={{
          width: '25vw',
          height: '25vh'
        }}>
        <Form onSubmit={handleSubmit}>
          <Form.Group className="mb-3" controlId="formBasicEmail">
            <Form.Label>Email</Form.Label>
            <Form.Control
              type="email"
              placeholder="Entre com email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              autoComplete="email"
              name="email"
            />
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
            <Form.Text className="text-muted">
              Esqueci minha senha.
            </Form.Text>

          </Form.Group>

          <Button variant="primary" type="submit">
            Enviar
          </Button>
        </Form>
      </div>
    </div>
  );
};
function Fundo({ x }) {
  return (
    <div
      style={{
        backgroundImage: "url('https://cdn.pixabay.com/photo/2020/04/18/01/04/cityscape-5057263_640.png')",
        backgroundSize: 'cover',
        backgroundPosition: 'center',
        width: '100vw',
        height: '100vh',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
      }}
    >
      {x}
    </div>
  )
}
export default Login;
