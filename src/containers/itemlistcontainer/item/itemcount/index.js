import React, { useState } from 'react';
import './itemcount.css';

const ItemCount = ({stock, initialValue, onAdd, item}) => {
    const [ quantity, setQuantity ] = useState(initialValue);

    const inc = () => {
        if (quantity < stock) {
            setQuantity(quantity + 1);
        }
    }

    const dec = () => {
        if (quantity > 0 ) {
            setQuantity(quantity - 1);
        }
    }

    return (
        <>
        <div className="input-group item-count">
            <div className="input-group-prepend">
                <button className="btn btn-decrement btn-outline-secondary btn-minus" type="button" onClick={() => dec()}>
                    <strong>−</strong>
                </button>
            </div>
            <span className="form-control amount">{(stock > initialValue) ? quantity : stock}</span>
            <div className="input-group-append">
                <button className="btn btn-increment btn-outline-secondary btn-plus" type="button" onClick={() => inc()}>
                    <strong>+</strong>
                </button>
            </div>
        </div>
        <button className='btn btn-primary' title="Agregar al carrito" disabled={!(stock > 0)} onClick={() => {
            if (stock > 0)
            {
                onAdd(item, quantity, stock);
                setQuantity(1);
            }
        }}>
            <i className='fas fa-cart-plus'></i>
        </button>
        </>
    )
}

export default ItemCount;