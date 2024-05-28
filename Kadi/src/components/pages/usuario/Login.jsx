import React, { useState, useEffect } from 'react';
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import getAuthToken from '../../../utils/authorization';
import TrocaSenha from './TrocaSenha';
import Fundo from './Fundo'
import backUrl from '../../../../config'
import './login.css';

const Login = () => {
  const [troca, setTroca] = useState(false);
  return (
    <>
      <Fundo
        x={
          <>
            {!troca && <Log setTroca={setTroca} />}
            {troca && <TrocaSenha setTroca={setTroca}/>}
          </>
        }
      />

    </>
  );
}
const Log = ({setTroca}) => {
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
      <h1 className="h1">Login</h1>
      <div>
        <Form onSubmit={handleSubmit}>
          <Form.Group className="mb-3" controlId="formBasicEmail">
            <Form.Label className='label'>Email</Form.Label>
            <Form.Control
              className='control'
              type="email"
              placeholder="Entre com email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              autoComplete="email"
              name="email"
            />
          </Form.Group>

          <Form.Group className="mb-3" controlId="formBasicPassword">
            <Form.Label className='label'>Senha</Form.Label>
            <Form.Control
              className='control'
              type="password"
              placeholder="Senha"
              autoComplete="current-password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
            <Form.Text  className="text-muted label2 text-center">
              <p onClick={()=>{setTroca(true)}} >Esqueci a senha</p>
            </Form.Text>

          </Form.Group>

          <Button className='label2' variant="primary" type="submit">
            Enviar
          </Button>
        </Form>
      </div>
    </div>
  );
};
export default Login;
