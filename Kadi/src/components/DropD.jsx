import React from 'react';
import Dropdown from 'react-bootstrap/Dropdown';

const DropD = ({ titulo, items }) => (
  <Dropdown>
    <Dropdown.Toggle variant="success" id="dropdown-basic">
      {titulo}
    </Dropdown.Toggle>

    <Dropdown.Menu>
      {items.map((item, index) => (
        <Dropdown.Item key={index} href={item.ref}>
          {item.nome}
        </Dropdown.Item>
      ))}
    </Dropdown.Menu>
  </Dropdown>
);

export default DropD;
