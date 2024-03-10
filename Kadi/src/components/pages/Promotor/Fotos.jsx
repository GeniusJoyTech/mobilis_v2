// Fotos.js
import React, { useState } from 'react';
import { Button } from 'react-bootstrap';

const Fotos = ({ data, toggleCamera, send }) => {
  const [photo, setPhoto] = useState(null);

  const handleCapture = async () => {
    const stream = await navigator.mediaDevices.getUserMedia({ video: true });
    const video = document.createElement('video');

    video.srcObject = stream;

    video.onloadedmetadata = () => {
      video.play();

      const captureCanvas = document.createElement('canvas');
      captureCanvas.width = video.videoWidth;
      captureCanvas.height = video.videoHeight;

      const captureCanvasContext = captureCanvas.getContext('2d');
      captureCanvasContext.drawImage(video, 0, 0, video.videoWidth, video.videoHeight);

      const imageData = captureCanvas.toDataURL('image/png');
      setPhoto(imageData);

      stream.getVideoTracks()[0].stop();
    };
  };

  const cancelPhoto = () => {
    setPhoto(null);
  };

  const sendPhoto = () => {
    console.log('Enviando foto para o servidor:', photo);
    console.log('Enviando dados para o servidor:', data);
    send(); // Corrected function call
  };

  return (
    <div>
      {!photo && (
        <div style={{ position: 'fixed', top: 0, left: 0, width: '100%', height: '100%', backgroundColor: 'black' }}>
          <video
            style={{ width: '100%', height: '100%', objectFit: 'cover' }}
            autoPlay
            playsInline
            muted
            ref={(video) => {
              if (video && !video.srcObject) {
                navigator.mediaDevices.getUserMedia({ video: true })
                  .then(stream => {
                    video.srcObject = stream;
                  })
                  .catch(error => {
                    console.error('Error accessing the camera:', error);
                  });
              }
            }}
          />
          <Button onClick={handleCapture} style={{ position: 'absolute', bottom: '20px', left: '50%', transform: 'translateX(-50%)', zIndex: 1 }}>Tirar Foto</Button>
          <Button onClick={toggleCamera} style={{ position: 'absolute', top: '20px', right: '20px', zIndex: 1 }}>Fechar Câmera</Button>
        </div>
      )}
      {photo && (
        <div style={{ position: 'fixed', top: 0, left: 0, width: '100%', height: '100%', backgroundColor: 'rgba(0, 0, 0, 0.8)', display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
          <img src={photo} alt="Captured" style={{ maxWidth: '80%', maxHeight: '80%' }} />
          <Button onClick={sendPhoto} style={{ position: 'absolute', bottom: '20px', left: '50%', transform: 'translateX(-50%)', zIndex: 1 }}>Enviar Foto</Button>
          <Button onClick={cancelPhoto} style={{ position: 'absolute', bottom: '20px', right: '20px', zIndex: 1 }}>Cancelar</Button>
        </div>
      )}
    </div>
  );
};

export default Fotos;

