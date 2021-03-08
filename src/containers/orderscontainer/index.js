import React, { useEffect, useState } from 'react';
import { useHistory } from 'react-router-dom';
import { useFirebaseContext } from '../../context/firebaseContext';
import { useCartContext } from '../../context/cartContext';
import './orders.css';
import { Col, Row, Container } from 'react-bootstrap';
import Order from '../../components/order';

const OrdersContainer = () => {
    const { getOrdersByUser } = useFirebaseContext();
    const [isLoading, setIsLoading] = useState(false);
    const [orders, setOrders] = useState([]);
    const { loggedUser } = useCartContext();
    const history = useHistory();
 
    useEffect(() => {
        setIsLoading(true);
        getOrdersByUser(loggedUser.id)
            .then((querySnapshot) => {
                if (querySnapshot.length === 0) {
                    console.log('Error');
                } else {
                    if (querySnapshot.docs.length > 0) {                        
                        setOrders(querySnapshot.docs.map(doc => ({ id: doc.id, ...doc.data() })));
                    }
                }
            }).catch(error => console.log(error)).finally(() => setIsLoading(false))
    }, []);

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
                    <Col xs={12} className="mt-5">
                        <h3>HISTORIAL DE ORDENES</h3>
                    </Col>
                    <Col xs={12}>
                        {
                            orders.map( (orderItem, index) => {
                                return <Order order={orderItem} key={index}/>
                            })
                        }
                    </Col>
                </Row>
            </Container>
        </Row>
    )
}

export default OrdersContainer;