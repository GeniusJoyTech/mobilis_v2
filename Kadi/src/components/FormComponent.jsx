import React from 'react';
import { Form } from 'react-bootstrap';

const FormComponent = ({ form, handleFormChange }) => {
    return (
        <>
            {form && (
                <Form>
                    {Object.entries(form).map(([key, value], index) => (
                        <Form.Group key={index} controlId={`form${key}`}>
                            <Form.Label>{key}</Form.Label>
                            <Form.Control type="text" name={key} value={value === null ? '' : value} onChange={handleFormChange} />
                        </Form.Group>
                    ))}
                </Form>
            )}
        </>
    );
};

export default FormComponent;
