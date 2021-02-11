import React from 'react';
import './itemcount.css';

const ItemCount = ({stock, quantity, inc, dec}) => {

    return (
            <div className="input-group item-count">
                <div className="input-group-prepend">
                    <button disabled={(quantity === 1)} className="btn btn-decrement btn-outline-secondary btn-minus" type="button" onClick={dec}>
                        <strong>−</strong>
                    </button>
                </div>
                <span className="form-control amount">{quantity}</span>
                <div className="input-group-append">
                    <button disabled={(quantity >= stock)} className="btn btn-increment btn-outline-secondary btn-plus" type="button" onClick={inc}>
                        <strong>+</strong>
                    </button>
                </div>
            </div>
    )
}

export default ItemCount;