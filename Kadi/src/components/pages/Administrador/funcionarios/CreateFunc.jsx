import { useState, useEffect } from "react";
import Modal from 'react-bootstrap/Modal';
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import buscarCEP from '../../../../utils/buscaCep'
import h_api from "../../../../hook/HApi";
import backUrl from '../../../../../config'

export default function CreateFunc({ open, close, url }) {
    const [send, setSend] = useState({}); // Inicialize send como um objeto vazio
    const [emailError, setEmailError] = useState(false);
    const [enviando, setEnviando] = useState(false);

    const validateEmail = (email) => {
        const re = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
        return re.test(String(email).toLowerCase());
    };
    const handleInputChange = (e) => {
        const { name, value } = e.target;
        if (name === 'cep') {
            let cepValue = value.replace(/\D/g, '');
            if (cepValue.length > 8) {
                cepValue = cepValue.slice(0, 8);
            }
            cepValue = cepValue.replace(/^(\d{5})(\d)/, '$1-$2');
            setSend(prevSend => ({
                ...prevSend,
                [name]: cepValue
            }));
        } else if (name === 'email') {
            setEmailError(!validateEmail(value));
            setSend(prevSend => ({
                ...prevSend,
                [name]: value
            }));
        } else {
            setSend(prevSend => ({
                ...prevSend,
                [name]: value
            }));
        }
    };
    ////
    const [sup, setSup] = useState();

    useEffect(() => {
        async function getSup() {
            const reqSup = {
                method: 'GET',
                url: backUrl + 'adm/sup/ver',
            };

            await h_api(reqSup, setSup);

        }
        getSup();
    }, []);

    ////
    const handleSubmit = async (e) => {
        setEnviando(true);
        e.preventDefault();
        if (!send.nome) {
            alert("O campo de nome é obrigatório.");
            setEnviando(false);
            return;
        }
        if (!send.cargo || send.cargo == 0) {
            alert("O campo de cargo é obrigatório.");
            setEnviando(false);
            return;
        }
        
        if (!send.cep) {
            alert("O campo de cep é obrigatório.");
            setEnviando(false);
            return;
        }
        
        if (!send.numero) {
            alert("O campo de número é obrigatório.");
            setEnviando(false);
            return;
        } else if(send.numero < 1){
            alert("Verifique o campo de número.");
            setEnviando(false);
            return;
        }
        if (!send.email) {
            alert("O campo de e-mail é obrigatório.");
            setEnviando(false);
            return;
        }
        if (emailError) {
            alert("Por favor, corrija o e-mail antes de enviar.");
            setEnviando(false);
            return;
        }
        await h_api({ method: 'POST', url: url, body: send });
        handleClose();
    };

    const handleClose = () => {
        setSend({});
        setEmailError(false);
        close();
        setEnviando(false);
    };
    return (
        <Modal show={open} onHide={handleClose}>

            <Modal.Header closeButton>
                <Modal.Title>Adicionar</Modal.Title>
            </Modal.Header>
            <Modal.Body>
                <form onSubmit={handleSubmit}>
                    <Form.Label htmlFor="nome">Nome</Form.Label>
                    <Form.Control type='text'
                        id='nome'
                        name='nome'
                        value={send['nome'] || ''}
                        onChange={handleInputChange}
                        required
                    ></Form.Control>

                    <Form.Label htmlFor="cracha">Crachá</Form.Label>
                    <Form.Control type='text'
                        id='cracha'
                        name='cracha'
                        value={send['cracha'] || ''}
                        onChange={handleInputChange}
                        required
                    ></ Form.Control>
                    <Form.Label htmlFor="cargo">Cargo</Form.Label>
                    <Form.Select aria-label="Default select example"
                        id='cargo'
                        name='cargo'
                        onChange={handleInputChange}
                        required
                    >
                        <option value={0} >Selecione um cargo</option>
                        <option value="Promotor">Promotor</option>
                        <option value="Supervisor">Supervisor</option>
                        <option value="Administrador">Administrador</option>
                    </Form.Select>

                    {
                        sup != null > 0 && (
                            <>
                                <Form.Label htmlFor="id_superior">Superior</Form.Label>
                                <Form.Select
                                    aria-label="Default select example"
                                    id='id_superior'
                                    name='id_superior'
                                    onChange={handleInputChange}
                                >
                                    <option value='' >Selecione um superior</option>
                                    {sup && sup.map(supervisor => (
                                        <option key={supervisor.id_usuario} value={supervisor.id_usuario}>
                                            {supervisor.nome}
                                        </option>
                                    ))}
                                </Form.Select>
                            </>
                        )
                    }
                    <Form.Label htmlFor="cep">Cep</Form.Label>
                    <Form.Control type='text'
                        id='cep'
                        name='cep'
                        value={send['cep'] || ''}
                        onChange={handleInputChange}
                        onBlur={(e) => { buscarCEP(e.target.value, setSend) }}
                        placeholder="xxxxx-xxx"
                    ></Form.Control>

                    <Form.Label htmlFor="numero">Número</Form.Label>
                    <Form.Control type='number'
                        id='numero'
                        name='numero'
                        value={send['numero'] || ''}
                        onChange={handleInputChange}
                    ></Form.Control>

                    <Form.Label htmlFor="rua">Rua</Form.Label>
                    <Form.Control type='text'
                        id='rua'
                        name='rua'
                        value={send['rua'] || ''}
                        onChange={handleInputChange}
                        placeholder="Informe o cep."
                        readOnly
                    ></Form.Control>

                    <Form.Label htmlFor="cidade">Cidade</Form.Label>
                    <Form.Control type='text'
                        id='cidade'
                        name='cidade'
                        value={send['cidade'] || ''}
                        onChange={handleInputChange}
                        placeholder="Informe o cep."
                        readOnly
                    ></Form.Control>

                    <Form.Label htmlFor="email">E-mail</Form.Label>
                    <Form.Control type='text'
                        id='email'
                        name='email'
                        value={send['email'] || ''}
                        onChange={handleInputChange}
                        placeholder="email@email.com"
                        isInvalid={emailError}
                        required
                    ></Form.Control>
                    <Form.Control.Feedback type="invalid">
                        Por favor, insira um e-mail válido.
                    </Form.Control.Feedback>

                </form>
            </Modal.Body>
            <Modal.Footer>
                <Button variant="secondary" onClick={handleClose}>
                    Cancelar
                </Button>
                <Button variant="primary" onClick={handleSubmit} disabled={enviando}>
                    Salvar Alterações
                </Button>
            </Modal.Footer>
        </Modal>
    );
}
