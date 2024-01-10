import React from 'react';
import Form from 'react-bootstrap/Form';

const Pesquisa = ({ searchTerm, onSearchChange }) => {
  return (
    <Form >
      <Form.Group controlId="formSearch">
        <Form.Control
          type="text"
          placeholder="Pesquisar..."
          value={searchTerm}
          onChange={onSearchChange}
        />
      </Form.Group>
    </Form>
  );
};

export default Pesquisa;
