import {Dropdown, DropdownButton} from 'react-bootstrap';

function MenuRotas(titulo) {
  return (
    <DropdownButton id="dropdown-basic-button" title={titulo}>
      <Dropdown.Item href="/mercado">Mercado</Dropdown.Item>
      <Dropdown.Item href="/roteiro">Roteiro</Dropdown.Item>
      <Dropdown.Item href="/funcionario">Funcionario</Dropdown.Item>
    </DropdownButton>
  );
}

export default MenuRotas;