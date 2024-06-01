import React, { useState, useEffect } from 'react';
import Button from 'react-bootstrap/Button';
import { Form, InputGroup } from 'react-bootstrap/';
import getAuthToken from '../../../utils/authorization';
import TrocaSenha from './TrocaSenha';
import Fundo from './Fundo';
import backUrl from '../../../../config';
import './login.css';
import CustomToast from '../../../hook/CustomToast';

const Login = () => {
  const [troca, setTroca] = useState(false);
  return (
    <>
      <Fundo
        x={
          <>
            {!troca && <Log setTroca={setTroca} />}
            {troca && <TrocaSenha setTroca={setTroca} />}
          </>
        }
      />
    </>
  );
};

const Log = ({ setTroca }) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showToast, setShowToast] = useState(false);
  const [toastMessage, setToastMessage] = useState('');
  const [showPassword, setShowPassword] = useState(false); // Estado para controlar a visibilidade da senha

  useEffect(() => {
    // Verifica se o usuário já está autenticado ao montar o componente
    const authToken = getAuthToken();
    if (authToken) {
      window.location.href = '/pro';
    }
  }, []);

  const handleSubmit = async (event) => {
    event.preventDefault();
    const re = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
    if (email == '') {
      alert('Campo email é obrigatório.');
      return;
    }
    else if (re.test(String(email).toLowerCase())) {
      try {
        const response = await fetch(backUrl + 'Login', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            email: email,
            senha: password,
          }),
        });

        if (!response.ok) {
          throw response;
        }

        const data = await response.json();
        const jwtToken = data.token;
        document.cookie = `Authorization=${jwtToken}; path=/;`;
        // Redireciona o usuário após o login bem-sucedido
        window.location.href = '/pro';
      } catch (error) {
        console.error('Erro na requisição:', error);
        if (error.status === 401) {
          setToastMessage('Email ou senha incorretos.');
        } else if (error.status === 403) {
          setToastMessage('Você está inativado. Contate seu superior.');
        } else {
          setToastMessage('Erro ao realizar login. Tente novamente mais tarde.');
        }
        setShowToast(true);
      }
    }
    else { alert("email incompleto.") }

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
            <div style={{ display: 'flex', alignItems: 'center' }}>
              <InputGroup>
                <Form.Control
                  className='control'
                  type={showPassword ? "text" : "password"} // Altera o tipo de acordo com o estado showPassword
                  placeholder="Senha"
                  autoComplete="current-password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                />
                <Button className='label2' variant="secondary" onClick={() => setShowPassword(!showPassword)}> {/* Botão para alternar a visibilidade da senha */}
                  {showPassword ? "Ocultar" : "Mostrar"}
                </Button>
              </InputGroup>
            </div>
            <Form.Text className="text-muted label2 text-center">
              <p onClick={() => { setTroca(true) }}>Esqueci a senha</p>
            </Form.Text>
          </Form.Group>

          <Button className='label2' variant="primary" type="submit">
            Enviar
          </Button>
        </Form>
      </div>

      <CustomToast showToast={showToast} setShowToast={setShowToast} toastTitulo={'Erro Durante o login'} toastMessage={toastMessage} delay={1500} />
    </div>
  );
};

export default Login;
