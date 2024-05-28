import { useState, useEffect } from "react";
import { Modal, Button } from 'react-bootstrap';
import h_api from "../../../../hook/HApi";
import backUrl from "../../../../../config";
import Dia from "./SelecionarDia";
import '../promotor.css';

export default function Notificacao() {
    const hoje = new Date().toISOString().split('T')[0];
    const [date, setDate] = useState(hoje);
    const [notificacoes, setNotificacoes] = useState(null);
    const [foto, setFoto] = useState(null);
    const [selectedNotification, setSelectedNotification] = useState(null); // Estado para armazenar a notificação selecionada
    const urlLog = backUrl + 'pro/log';
    const urlLogFoto = backUrl + 'pro/log/foto';
    const reqPL = {
        method: 'POST',
        url: urlLog,
        body: { date },
    }

    const reqNotificacao = async () => {
        setNotificacoes(null);
        await h_api(reqPL, setNotificacoes);
    };

    const reqFoto = async (id) => {
        const reqFt = {
            method: 'POST',
            url: urlLogFoto,
            body: { id_agenda: id },
        }
        setFoto(null);
        await h_api(reqFt, setFoto);
        handleShow(); // Exibir o modal após carregar a foto
    };

    useEffect(() => {
        reqNotificacao();
    }, [urlLog, date]);

    const handleClose = () => {
        setFoto(null);
        setSelectedNotification(null); // Limpar a notificação selecionada quando o modal é fechado
    }

    return (
        <div style={{ margin: '10px' }}>
            <Dia hoje={hoje} date={date} setDate={setDate} />
            <div style={{ marginTop: '10px', display: "flex", flexDirection: 'column', alignItems: 'center' }}>
                {notificacoes && notificacoes.map((n) => {
                    return (
                        <div key={n.id_servico} >
                            <p onClick={() => { setSelectedNotification(n); reqFoto(n.id_servico); }} className="label">Realizou {n.descricao} na loja {n.loja}  {dataFormatada(n.datahora)}</p>
                            <div style={{ borderBottom: '1px solid', borderRadius: '1px', margin: '2px' }}></div>
                        </div>
                    )
                })}
            </div>

            {/* Modal para exibir a foto */}
            {selectedNotification && (
                <ImageModal
                    show={foto !== null} // Exibir o modal apenas se a foto estiver disponível
                    handleClose={handleClose}
                    imageData={foto}
                />
            )}
        </div>
    );
}

function ImageModal(props) {
    console.log(props.imageData);
    return (
        <>
            <Modal show={props.show} onHide={props.handleClose}>
                <Modal.Header closeButton>
                    <Modal.Title>Log</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <img src={props.imageData} alt="Foto" style={{ maxWidth: '100%' }} />
                </Modal.Body>
                <Modal.Footer>
                    <Button variant="secondary" onClick={props.handleClose}>
                        Fechar
                    </Button>
                </Modal.Footer>
            </Modal>
        </>
    );
}

function dataFormatada(data) {
    const dataHora = new Date(data);

    const dia = ('0' + dataHora.getDate()).slice(-2);
    const mes = ('0' + (dataHora.getMonth() + 1)).slice(-2);
    const hora = ('0' + dataHora.getHours()).slice(-2);
    const minuto = ('0' + dataHora.getMinutes()).slice(-2);
    const dataFormatada = `${dia}-${mes} ${hora}:${minuto}`;
    return dataFormatada;
}
