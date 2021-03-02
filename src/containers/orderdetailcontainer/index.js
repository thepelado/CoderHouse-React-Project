import React, { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import { useFirebaseContext } from '../../context/firebaseContext';
import './orderdetailcontainer.css';
import Page404 from '../page404';
import { Col, Row, Container, Button } from 'react-bootstrap';
import OrderDetail from '../../components/order/orderitem/orderdetail'

const OrderDetailContainer = () => {

    const [ order, setOrder ] = useState({});
    const [ isLoading, setIsLoading ] = useState();
    const { getOrderByID } = useFirebaseContext();
    const { orderId } = useParams();
 
    useEffect(async() => {
        setIsLoading(true);
        await getOrderByID(orderId).then((querySnapshot) => {
            setOrder({id: querySnapshot.id, ...querySnapshot.data()});
        }).catch(error => console.log(error)).finally(() => setIsLoading(false))
    }, []);

        if (isLoading)
        {
            return (
                <Row className="order-detail-container pt-3 pb-5">
                    <Container>
                        <Row>
                            <Col xs={12} className="p-5 text-center">
                                <div className="spinner-border" role="status">
                                    <span className="sr-only">Cargando...</span>
                                </div>
                            </Col>
                        </Row>
                    </Container>
                </Row>
            )
        }
        if (!order)
        {
            return (
                <Page404/>
            )
        }
        return (
            <Row className="order-detail-container pt-3 pb-5">
                <Container>
                    <Col xs={12}>
                        <h3>RESUMEN DE LA ORDEN #{order.id}</h3>
                    </Col>
                    <Col xs={12}>
                        <OrderDetail order={order}/>
                    </Col>
                    <Col xs={12} className="text-center">
                        <h4 className="my-4">¡Muchas gracias por su compra!<br/>¡Sigue explorando nuestra tienda para encontrar un producto ideal para ti!</h4>
                        <Link to="/" className="text-white">  
                            <Button variant="primary">¡Sigue comprando!</Button>
                        </Link>
                    </Col>
                </Container>
            </Row>
        )
}

export default OrderDetailContainer;