import { useHistory } from 'react-router-dom';
import { useCartContext } from '../../context/cartContext';
import './profile.css';
import { Col, Row, Container } from 'react-bootstrap';

const ProfileContainer = () => {
    const { loggedUser } = useCartContext();
    const history = useHistory();
 
    if (!loggedUser)
    {
        return (
            history.push('/')
        )
    }

    return (
        <Row className="order-detail-container pt-3 pb-5">
            <Container>
                <Row>
                    <Col xs={12}>
                        <h3>DATOS DEL USUARIO</h3>
                    </Col>
                    <Col xs={12}>
                        <p>Nombre: {loggedUser.nombre}</p>
                        <p>Email: {loggedUser.email}</p>
                        <p>Teléfono: {loggedUser.phone}</p>
                    </Col>
                </Row>
            </Container>
        </Row>
    )
}

export default ProfileContainer;