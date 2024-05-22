import React, { useState, useRef } from 'react';
import { Button } from "react-bootstrap";

const Camera = ({ fechar, enviarFoto }) => {
    const [stream, setStream] = useState(null);
    const videoRef = useRef();

    const iniciarCamera = () => {
        navigator.mediaDevices.getUserMedia({ video: true })
            .then((mediaStream) => {
                setStream(mediaStream);
                videoRef.current.srcObject = mediaStream;
            })
            .catch((error) => {
                console.error('Erro ao acessar a câmera:', error);
            });
    };
    const toggleCamera = () => {
        if (!stream) return; // Verificar se a câmera está ativada

        const videoTracks = stream.getVideoTracks();
        if (videoTracks.length === 0) return; // Verificar se há uma pista de vídeo

        const currentTrack = videoTracks[0];
        const currentSettings = currentTrack.getSettings();
        const facingMode = currentSettings.facingMode;

        // Calcular o novo facingMode
        const newFacingMode = facingMode === 'environment' ? 'user' : 'environment';

        // Parar a câmera atual
        stream.getTracks().forEach(track => track.stop());

        // Ativar a próxima câmera com o novo facingMode
        navigator.mediaDevices.getUserMedia({ video: { facingMode: newFacingMode } })
            .then(mediaStream => {
                setStream(mediaStream);
                videoRef.current.srcObject = mediaStream;
            })
            .catch(error => {
                console.error('Erro ao trocar de câmera:', error);
            });
    };

    const capturarFoto = () => {
        const canvas = document.createElement('canvas');
        const context = canvas.getContext('2d');

        const maxWidth = 800;
        const maxHeight = 600;

        // Redimensionar a imagem para o tamanho desejado
        const scaleFactor = Math.min(1, maxWidth / videoRef.current.videoWidth, maxHeight / videoRef.current.videoHeight);
        const width = videoRef.current.videoWidth * scaleFactor;
        const height = videoRef.current.videoHeight * scaleFactor;

        // Definir o tamanho do canvas igual ao tamanho desejado
        canvas.width = width;
        canvas.height = height;

        // Desenhar a imagem redimensionada no canvas
        context.drawImage(videoRef.current, 0, 0, width, height);

        const dataUrl = canvas.toDataURL('image/jpeg');

        // Aqui você pode lidar com a foto capturada
        enviarFoto(dataUrl);
        stream.getTracks().forEach((track) => track.stop());
        setStream(null);
        videoRef.current.srcObject = null;
        // console.log('Foto capturada:', dataUrl);
    };

    const pararCamera = () => {
        if (stream) {
            stream.getTracks().forEach((track) => track.stop());
            setStream(null);
            videoRef.current.srcObject = null;
        }
        fechar();
    };

    return (
        <div style={{ position: 'relative', width: '100%', height: '100vh', display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
            <video ref={videoRef} autoPlay muted style={{ width: '100%', height: '100%' }} />
            {stream == null && (
                <Button onClick={iniciarCamera} style={{ position: 'absolute', top: '50%', left: '50%', transform: 'translate(-50%, -50%)' }}>Ativar Câmera</Button>
            )}
            {stream != null && (
                <Button onClick={capturarFoto} style={{ position: 'absolute', bottom: '10px', left: '50%', transform: 'translateX(-50%)' }}>Capturar Foto</Button>
            )}
            {stream != null && (
                <Button onClick={toggleCamera} style={{ position: 'absolute', top: '10px', left: '10px' }}>Trocar Camera</Button>
            )}
            <Button onClick={pararCamera} style={{ position: 'absolute', top: '10px', right: '10px' }}>Encerrar</Button>
        </div>
    );
};

export default Camera;
