import { Modal, Button } from 'react-bootstrap';
import Drop from './Drop';
import FormComponent from './FormComponent';

export default function CustomModal({ titulo, show, onHide, form, list, handleListChange, handleFormChange, handleSendSubmit, handleDeleteSubmit }) {
    return (
        <Modal show={show} onHide={onHide}>
            <Modal.Header closeButton>
                <Modal.Title>{titulo}</Modal.Title>
            </Modal.Header>
            <Drop list={list} handleListChange={handleListChange} />
            <Modal.Body>
                <FormComponent form={form} handleFormChange={handleFormChange} />
            </Modal.Body>
            <Modal.Footer>
                <Button variant="primary" onClick={handleSendSubmit}>
                    Salvar
                </Button>
                {titulo === 'Editar' && 
                    <Button variant="danger" onClick={handleDeleteSubmit}>
                        Deletar
                    </Button>}
            </Modal.Footer>
        </Modal>
    );
}
