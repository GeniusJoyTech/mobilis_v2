import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import InputGroup from 'react-bootstrap/InputGroup';
import React, { useState } from 'react';
import backUrl from '../../../../config';
import './login.css';

import Fundo from './Fundo';

const NovaSenha = () => {
  const [token, setToken] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);

  const handleClearPassword = () => {
    setPassword('');
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    if(token == ''){
      alert("Você precisa informar o token recebido no email.");
    }
    else{
      await fetch(backUrl + 'nova/senha', {
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
          alert('Verifique o token');
          throw new Error(`Erro na requisição: ${response.status}`);
        }
        window.location.href = './login';
      });
    }

  };

  return (
    <Fundo
      x={
        <>
          <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', marginTop: '25vh' }}>
            <Form onSubmit={handleSubmit}>
              <Form.Group className="mb-3" controlId="formBasicEmail">
                <Form.Label className='label'>Token de controle</Form.Label>
                <Form.Control
                  className='control'
                  type="text"
                  placeholder="Entre com o token enviado no email."
                  value={token}
                  onChange={(e) => setToken(e.target.value)}
                  name="token"
                />
                <Form.Text className="text-muted label2 text-center">
                  Não compartilhe seu token com terceiros.
                </Form.Text>
              </Form.Group>

              <Form.Group className="mb-3" controlId="formBasicPassword">
                <Form.Label className='label'>Senha</Form.Label>
                <InputGroup className='control'>
                  <Form.Control
                    type={showPassword ? "text" : "password"}
                    placeholder={password ? "Informe uma nova senha" : "Senha"}
                    autoComplete="new-password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                  />
                  <Button className='label2' variant="secondary" onClick={() => setShowPassword(!showPassword)}>
                    {showPassword ? "Ocultar" : "Mostrar"}
                  </Button>

                </InputGroup>
                {password && (
                  <p
                    variant="outline-secondary"
                    onClick={handleClearPassword}
                  >
                    Limpar
                  </p>
                )}
              </Form.Group>

              <Button className='label2' variant="primary" type="submit">
                Enviar
              </Button>
            </Form>
          </div>
        </>
      }
    />
  );
};

export default NovaSenha;
