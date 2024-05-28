import React, { useState, useRef } from 'react';
import { Button } from "react-bootstrap";
import '../promotor.css';

const Camera = ({ fechar, enviarFoto }) => {
    const [stream, setStream] = useState(null);
    const [facingMode, setFacingMode] = useState('environment');
    const videoRef = useRef();

    const iniciarCamera = async () => {
        try {
            const mediaStream = await navigator.mediaDevices.getUserMedia({ video: { facingMode: 'environment' } });
            setStream(mediaStream);
            videoRef.current.srcObject = mediaStream;
            // Rolar suavemente até o vídeo após iniciar a câmera
            videoRef.current.scrollIntoView({ behavior: 'smooth' });
        } catch (error) {
            console.error('Erro ao acessar a câmera traseira:', error);
            try {
                const mediaStream = await navigator.mediaDevices.getUserMedia({ video: { facingMode: 'user' } });
                setStream(mediaStream);
                setFacingMode('user');
                videoRef.current.srcObject = mediaStream;
                // Rolar suavemente até o vídeo após iniciar a câmera
                videoRef.current.scrollIntoView({ behavior: 'smooth' });
            } catch (userError) {
                console.error('Erro ao acessar a câmera frontal:', userError);
            }
        }
    };

    const toggleCamera = async () => {
        if (!stream) return;

        const newFacingMode = facingMode === 'environment' ? 'user' : 'environment';
        stream.getTracks().forEach(track => track.stop());

        try {
            const mediaStream = await navigator.mediaDevices.getUserMedia({ video: { facingMode: newFacingMode } });
            setStream(mediaStream);
            setFacingMode(newFacingMode);
            videoRef.current.srcObject = mediaStream;
        } catch (error) {
            console.error('Erro ao trocar de câmera:', error);
        }
    };

    const capturarFoto = () => {
        const canvas = document.createElement('canvas');
        const context = canvas.getContext('2d');

        const maxWidth = 800;
        const maxHeight = 600;

        const scaleFactor = Math.min(1, maxWidth / videoRef.current.videoWidth, maxHeight / videoRef.current.videoHeight);
        const width = videoRef.current.videoWidth * scaleFactor;
        const height = videoRef.current.videoHeight * scaleFactor;

        canvas.width = width;
        canvas.height = height;

        context.drawImage(videoRef.current, 0, 0, width, height);

        const dataUrl = canvas.toDataURL('image/jpeg');

        enviarFoto(dataUrl);
        stream.getTracks().forEach((track) => track.stop());
        setStream(null);
        videoRef.current.srcObject = null;
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
        <div style={{ position: 'relative', width: '100vw', height: '100vh', overflow: 'hidden' }}>
            <video ref={videoRef} autoPlay muted style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
            {stream == null && (
                <Button className='label2' onClick={iniciarCamera} style={{ position: 'absolute', top: '50%', left: '50%', transform: 'translate(-50%, -50%)' }}>
                    Ativar Câmera
                </Button>
            )}
            {stream != null && (
                <>
                    <Button className='label2' onClick={capturarFoto} style={{ position: 'absolute', bottom: '300px', left: '50%', transform: 'translateX(-50%)' }}>
                        Capturar Foto
                    </Button>
                    <Button className='label2' onClick={toggleCamera} style={{ position: 'absolute', top: '10px', left: '10px' }}>
                        Trocar Câmera
                    </Button>
                </>
            )}
            <Button className='label2' onClick={pararCamera} style={{ position: 'absolute', top: '10px', right: '10px' }}>
                Encerrar
            </Button>
        </div>
    );
};

export default Camera;
