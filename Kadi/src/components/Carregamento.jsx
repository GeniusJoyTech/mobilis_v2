import Spinner from 'react-bootstrap/Spinner';
export default function LoadingContainer() {
    return (
        <div
            style={{
                position: 'absolute',
                top: '50%',
                left: '50%',
                transform: 'translate(-50%, -50%)',
            }}
        >
            <Spinner animation="border" role="status">
            </Spinner>
            <p>Carregando...</p>
        </div>
    );
};
