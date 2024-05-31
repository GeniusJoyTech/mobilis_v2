import { Toast, ToastContainer } from 'react-bootstrap/';
import './style.css';
const CustomToast = ({ showToast, setShowToast, toastTitulo, toastMessage, delay }) => {
    return (
        <ToastContainer  position="top-center" className="p-3">
            <Toast show={showToast} onClose={() => setShowToast(false)} delay={delay} autohide>
                <Toast.Header>
                    <strong  className="me-auto label2">{toastTitulo}</strong>
                </Toast.Header>
                <Toast.Body className={'label2'}>{toastMessage}</Toast.Body>
            </Toast>
        </ToastContainer>
    );
};
export default CustomToast;