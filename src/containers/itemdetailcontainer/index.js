import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import ItemDetail from '../../components/itemlist/item/itemdetail';
import { useFirebaseContext } from '../../context/firebaseContext';
import './itemdetailcontainer.css';
import Page404 from '../page404';
import { Col, Row, Container } from 'react-bootstrap';

const ItemDetailContainer = () => {

    const [ item, setItem ] = useState({});
    const [ isLoading, setIsLoading ] = useState();
    const { getItemByID, crearProductos } = useFirebaseContext();
    const { itemId } = useParams();
 
    useEffect(() => {
        setIsLoading(true);
        getItemByID(itemId).then((item) => {
            setItem(item);
        }).catch(error => {
            console.log(error);
            setItem({});
        }).finally(() => setIsLoading(false))
    }, []);

        if (isLoading)
        {
            return (
                <Row className="item-detail-container pt-3 pb-5">
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
        if (!item.id)
        {
            return (
                <Page404 title="Producto no encontrado"/>
            )
        }
        return (
            <Row className="item-detail-container pt-3 pb-5">
                <Container>
                    <ItemDetail item={item} />
                </Container>
            </Row>
        )
}

export default ItemDetailContainer;