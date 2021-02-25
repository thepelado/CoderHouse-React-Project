import React, { useState } from 'react';
import NumberFormat from 'react-number-format';
import { useHistory } from "react-router-dom";
import { useCartContext } from '../../../../context/cartContext';
import { useWishListContext } from '../../../../context/wishListContext';
import ItemCount from './itemcount';
import './itemdetail.css';

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
        <>
        <div className="col-md-6 photo-container">
            <img className='photo img-fluid' src={item.photo} alt={item.title}></img>
        </div>
        <div className="col-md-6 item-detail">
            <div className='h-100 position-relative'>
                {item.stock < 10 &&
                    <div className="position-absolute bg-danger px-2 py-1 rounded" style={{ "right": "0" }}>
                        <span className="text-white">¡Últimas unidades!</span>
                    </div>
                }
                <div className="row pt-5">
                    <div className="col-10">
                        <h5 className='card-title'>{item.title}</h5>
                    </div>
                    <div className="col-2 text-right">                    
                        <button className="btn-wishList" onClick={handlerAddToWishList}>
                            { isInWishList(item.id)? 
                                <i className="fas fa-heart"></i>
                            :
                                <i className="far fa-heart"></i>
                            }
                        </button>
                    </div>
                </div>
                <div className='card-text'>
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
                                <button className='btn btn-primary btn-add-to-cart' title="Agregar al carrito" disabled={!(item.stock > 0)} onClick={onAddToCart}>
                                    <i className='fas fa-cart-plus'></i>
                                </button>
                            </>
                        : 
                            <button className="btn btn-success btn-finish" onClick={()=>history.push('/cart')}>
                                <i className="fas fa-shopping-bag"></i> Terminar mi compra
                            </button>
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
        </div>
        <div className="col-md-12 item-data mt-2">
            <ul className="nav nav-tabs" role="tablist">
                <li className="nav-item" role="presentation">
                    <a className="nav-link active" id="description-tab" data-toggle="tab" href="#description" role="tab" aria-controls="description" aria-selected="true">Descripción</a>
                </li>
            </ul>
            <div className="tab-content">
                <div className="tab-pane fade show active" id="description" role="tabpanel" aria-labelledby="description-tab">
                    <p>{item.description}</p>
                    <p><b>SKU: </b>{item.sku} / <b>Categorías: </b>{item.category} / <b>Marca: </b>{item.brand}</p>
                </div>
            </div>
        </div>
        </>
    );
}

export default ItemDetail;