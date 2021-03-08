import React, { useState } from 'react';
import { useCartContext } from '../../../context/cartContext';
import { useWishListContext } from '../../../context/wishListContext';
import { Link, useHistory } from 'react-router-dom';
import './wishlistitem.css';
import NumberFormat from 'react-number-format';
import { Button } from 'react-bootstrap';
import ItemCount from '../../itemlist/item/itemdetail/itemcount';

const WishListItem = ({item}) => {

    const { addItem } = useCartContext();
    const { removeItemWishList} = useWishListContext();
    const [quantity, setQuantity] = useState(1);
    const [isAdd, setIsAdd] = useState(false);
    const history = useHistory();

    const handleRemoveItemWishList = () => {
        removeItemWishList(item);
    }

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

    return (
        <tr className="item">
            <td className="align-middle">
                <button className="remove" onClick={handleRemoveItemWishList}  title="Remover producto de la lista de deseos"><i className="fas fa-times"></i></button>
            </td>
            <td>
                <img className='photo img-fluid' src={item.photo} alt={item.title}></img>
            </td> 
            <td className="align-middle">
                <Link to={`/item/${item.id}`} className="text-secondary">{item.title}</Link>
            </td>
            <td className="align-middle">
                <strong>
                    <NumberFormat value={item.price } decimalSeparator={','} displayType={'text'} thousandSeparator={'.'} prefix={'$'} />
                </strong>
            </td>
            <td className="align-middle">
                <div className="item-actions d-flex">
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
            </td>
        </tr>
    )
}

export default WishListItem;