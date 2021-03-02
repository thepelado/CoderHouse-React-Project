import React, { useState } from 'react';
import NumberFormat from 'react-number-format';
import { useHistory } from "react-router-dom";
import { useCartContext } from '../../../../context/cartContext';
import { useWishListContext } from '../../../../context/wishListContext';
import ItemCount from './itemcount';
import './itemdetail.css';
import { Col, Row, Tabs, Tab, Button, Badge } from 'react-bootstrap';

const ItemDetail = ({item}) => {
    
    const { addItem } = useCartContext();
    const { isInWishList, updateItemWishList } = useWishListContext();
    const [quantity, setQuantity] = useState(1);
    const [isAdd, setIsAdd] = useState(false);

    const history = useHistory();

    const inc = () => {
        if (quantity < item.stock) {
            setQuantity(quantity + 1);
        }
    }

    const dec = () => {
        if (quantity > 0 ) {
            setQuantity(quantity - 1);
        }
    }

    const onAddToCart = () => {
        addItem(item, quantity); //add item to cartContext
        setQuantity(1);
        setIsAdd(true);
    }

    const handlerAddToWishList = () => {
        updateItemWishList(item);
    }

    return (
        <Row>
            <Col xs={12} md={6} className="photo-container">
                <img className='photo img-fluid' src={item.photo} alt={item.title}></img>
            </Col>
            <Col xs={12} md={6} className="item-detail">
                <div className='h-100 position-relative'>
                    {item.stock < 10 &&
                        
                        <Badge pill variant="danger" className="position-absolute px-3 py-2" style={{ "right": "0" }}>¡Últimas unidades!</Badge>
                    }
                    <Row className="pt-5">
                        <Col xs={10}>
                            <h5 className='title'>{item.title}</h5>
                        </Col>
                        <Col xs={2} className="text-right">                    
                            <button className="btn-wishList" onClick={handlerAddToWishList}>
                                { isInWishList(item.id)? 
                                    <i className="fas fa-heart"></i>
                                :
                                    <i className="far fa-heart"></i>
                                }
                            </button>
                        </Col>
                    </Row>
                    <div className='text'>
                        <span className='categories'>{item.category} / {item.brand}</span>
                        <hr/>
                        <span className='price'>
                            <NumberFormat value={item.price } decimalSeparator={','} displayType={'text'} thousandSeparator={'.'} prefix={'$'} />
                        </span>
                        <hr/>
                        <span className='stock'><b>Disponibilidad:</b> {item.stock} {item.stock > 1 ? "unidades disponibles" : "última unidad disponible"}.</span>
                        <hr/>
                        <div className="item-actions">
                            { !isAdd ? 
                                <>
                                    <ItemCount stock={item.stock} quantity={quantity} inc={inc} dec={dec} />
                                    <Button variant="primary" className="btn-add-to-cart" title="Agregar al carrito" disabled={!(item.stock > 0)} onClick={onAddToCart}>
                                        <i className='fas fa-cart-plus'></i>
                                    </Button>
                                </>
                            : 
                                <Button variant="success" className="btn-finish" title="erminar mi compra" onClick={()=>history.push('/cart')}>
                                    <i className="fas fa-shopping-bag"></i> Terminar mi compra
                                </Button>
                            }
                        </div>
                        <div className="shipping-options">
                            <p><span><i className="fa fa-shipping-fast"></i> Entrega Express:</span> Recíbelo en 2 horas o cuando tú quieras</p>
                            <p><span><i className="fa fa-truck"></i> Envío Estándar:</span> Recíbelo en 1-2 días</p>
                            <p><span><i className="far fa-clock"></i> Recogida Express:</span> Recógelo en 1 hora</p>
                            <p><span><i className="fa fa-archive"></i> Recogida:</span> Recógelo en 1-2 días</p>
                        </div>
                    </div>                
                </div>
            </Col>
            <Col xs={12}  className="item-data mt-2">
                <Tabs defaultActiveKey="descripción" id="uncontrolled-tab-example">
                    <Tab eventKey="descripción" title="Descripción">
                        <p>{item.description}</p>
                        <p><b>SKU: </b>{item.sku} / <b>Categorías: </b>{item.category} / <b>Marca: </b>{item.brand}</p>
                    </Tab>
                </Tabs>
            </Col>
        </Row>
    );
}

export default ItemDetail;