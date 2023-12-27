import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';

function Mercado(props) {
  return (
      <Row>
        <Col>props.nome</Col>
        <Col>props.endereco</Col>
      </Row>
  );
}

export default Mercado;