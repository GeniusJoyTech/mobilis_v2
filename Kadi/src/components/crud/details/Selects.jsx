import React from 'react';
import Form from 'react-bootstrap/Form';

function Selects({ row, dropItens, handleSelectChange }) {
  const data = row;
  // Função para renderizar as opções de um select
  const renderOptions = (optionsArray, key) => {
    return optionsArray.map((subArray, subArrayIndex) => {
      const subArrayValues = Object.values(subArray).join(' - ');
      const subValue = Object.values(subArray);
      return (
        <option key={`${key}-${subArrayIndex}`} value={subValue}>
          {subArrayValues}
        </option>
      );
    });
  };

  const renderSelectCreate = (item) => {
    const key = Object.keys(item)[0];
    const options = renderOptions(item[key], key);
    return (
      <div key={key}>
        <Form.Label htmlFor={key}>{key}</Form.Label>
        <Form.Select id={key} name={key} onChange={handleSelectChange}>
          <option value="">Selecione {key}...</option>
          {options}
        </Form.Select>
      </div>
    );
  };


  const renderSelectEdit = (item) => {
    const key = Object.keys(item)[0];
    const options = renderOptions(item[key], key);
    const val = Object.values(row);
    return (
      <div key={key}>
        <Form.Label htmlFor={key}>{key}</Form.Label>
        <Form.Select id={key} name={key} onChange={handleSelectChange}>
          <option value={val}>{key} atual: {data[key]}</option>
          {options}
        </Form.Select>
      </div>
    );
  };

  // Renderiza todos os selects
  return (
    <div>
      {row != null || '' ?
        dropItens.map((item) => renderSelectEdit(item))
        :
        dropItens.map((item) => renderSelectCreate(item))
      }
    </div>
  );
}

export default Selects;
