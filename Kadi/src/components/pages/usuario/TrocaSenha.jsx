import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import React, { useState } from 'react';

const TrocaSenha = () =>{
    const [email, setEmail] = useState('');
    const handleSubmit = async (event) => {
        event.preventDefault();
    
        await fetch('https://localhost:5000/senha/editar', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            email: email
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
                type="email"
                placeholder="Entre com email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                autoComplete="email"
                name="email"
              />
            </Form.Group>
    
            <Button variant="primary" type="submit">
              Enviar
            </Button>
          </Form>
          </div>
      );
}
export default TrocaSenha;