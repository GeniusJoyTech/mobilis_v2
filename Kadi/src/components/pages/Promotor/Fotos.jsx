import React, { useState, useEffect } from 'react';
import { Button, Modal } from 'react-bootstrap';
import h_api from '../../../hook/HApi';

import backUrl from '../../../../config.js';

const Fotos = ({ data, toggleCamera, send, pk_atv }) => {
  const [photo, setPhoto] = useState(null);
  const [showConfirmation, setShowConfirmation] = useState(false);
  const [facingMode, setFacingMode] = useState('environment'); // 'user' for front camera, 'environment' for back camera
  const url = backUrl + 'pro/foto/incluir';

  useEffect(() => {
    if (photo) {
      setShowConfirmation(true);
    }
  }, [photo]);

  const handleCapture = async () => {
    try {
      const imageData = await capturePhoto();
      setPhoto(imageData);
    } catch (error) {
      console.error('Error capturing photo:', error);
    }
  };

  const switchCamera = () => {
    setFacingMode((prevMode) => (prevMode === 'user' ? 'environment' : 'user'));
  };

  const capturePhoto = async () => {
    const stream = await navigator.mediaDevices.getUserMedia({ video: { facingMode } });
    const video = document.createElement('video');
    video.srcObject = stream;

    return new Promise((resolve, reject) => {
      video.onloadedmetadata = () => {
        video.play();

        const captureCanvas = document.createElement('canvas');
        captureCanvas.width = video.videoWidth;
        captureCanvas.height = video.videoHeight;

        const captureCanvasContext = captureCanvas.getContext('2d');
        captureCanvasContext.drawImage(video, 0, 0, video.videoWidth, video.videoHeight);

        const imageData = captureCanvas.toDataURL('image/png');

        stream.getVideoTracks()[0].stop();
        resolve(imageData);
      };

      video.onerror = (error) => {
        reject(error);
      };
    });
  };

  const cancelPhoto = () => {
    setPhoto(null);
  };

  const sendPhoto = async () => {
    setShowConfirmation(false);

    try {
      const resizedImageData = await resizeImage(photo);
      data.foto = resizedImageData;
      const now = new Date();
      const formattedDate = now.toLocaleString();
      const year = formattedDate.substring(6, 10);
      const month = formattedDate.substring(3, 5);
      const day = formattedDate.substring(0, 2);
      const hours = formattedDate.substring(12, 14);
      const minutes = formattedDate.substring(15, 17);
      const seconds = formattedDate.substring(18, 20);
      const agora = `${year}-${month}-${day} ${hours}:${minutes}:${seconds}`;
      data.dia = agora;
      data.atividade = pk_atv;
      await h_api({ method: 'POST', url: url, body: data });
      console.log("Enviando Foto para a API:", data, url);
      send();
    } catch (error) {
      console.error("Erro ao enviar foto para a API:", error);
    }
  };

  const resizeImage = async (imageData) => {
    const MAX_WIDTH = 800;
    const MAX_HEIGHT = 600;
    const QUALITY = 0.7;

    const img = new Image();
    img.src = imageData;

    return new Promise((resolve, reject) => {
      img.onload = () => {
        let width = img.width;
        let height = img.height;

        if (width > height) {
          if (width > MAX_WIDTH) {
            height *= MAX_WIDTH / width;
            width = MAX_WIDTH;
          }
        } else {
          if (height > MAX_HEIGHT) {
            width *= MAX_HEIGHT / height;
            height = MAX_HEIGHT;
          }
        }

        const canvas = document.createElement('canvas');
        canvas.width = width;
        canvas.height = height;

        const ctx = canvas.getContext('2d');
        ctx.drawImage(img, 0, 0, width, height);

        const resizedImageData = canvas.toDataURL('image/jpeg', QUALITY);
        resolve(resizedImageData);
      };

      img.onerror = (error) => {
        reject(error);
      };
    });
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
                navigator.mediaDevices.getUserMedia({ video: { facingMode } })
                  .then(stream => {
                    video.srcObject = stream;
                  })
                  .catch(error => {
                    console.error('Error accessing the camera:', error);
                  });
              } else if (video && video.srcObject && video.srcObject.getVideoTracks().length > 0) {
                video.srcObject.getVideoTracks().forEach(track => {
                  track.stop();
                });
                navigator.mediaDevices.getUserMedia({ video: { facingMode } })
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
          <Button onClick={switchCamera} style={{ position: 'absolute', top: '20px', right: '20px', zIndex: 1 }}>Trocar Câmera</Button>
          <Button onClick={toggleCamera} style={{ position: 'absolute', top: '20px', left: '20px', zIndex: 1 }}>Fechar Câmera</Button>
        </div>
      )}
      {photo && (
        <div style={{ position: 'fixed', top: 0, left: 0, width: '100%', height: '100%', backgroundColor: 'rgba(0, 0, 0, 0.8)', display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
          <img src={photo} alt="Captured" style={{ maxWidth: '80%', maxHeight: '80%' }} />
          <Button onClick={() => setShowConfirmation(true)} style={{ position: 'absolute', bottom: '20px', left: '50%', transform: 'translateX(-50%)', zIndex: 1 }}>Enviar Foto</Button>
          <Button onClick={cancelPhoto} style={{ position: 'absolute', bottom: '20px', right: '20px', zIndex: 1 }}>Cancelar</Button>
        </div>
      )}
      <Modal show={showConfirmation} onHide={() => setShowConfirmation(false)}>
        <Modal.Header closeButton>
          <Modal.Title>Confirmação</Modal.Title>
        </Modal.Header>
        <Modal.Body>Deseja realmente enviar esta foto?</Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={() => setShowConfirmation(false)}>
            Cancelar
          </Button>
          <Button variant="primary" onClick={sendPhoto}>
            Enviar
          </Button>
        </Modal.Footer>
      </Modal>
    </div>
  );
};

export default Fotos;
