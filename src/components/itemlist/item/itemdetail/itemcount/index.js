import React from 'react';
import './itemcount.css';
import { Button } from 'react-bootstrap';

const ItemCount = ({stock, quantity, inc, dec}) => {

    return (
            <div className="input-group item-count">
                <div className="input-group-prepend">
                    <Button disabled={(quantity === 1)} variant="outline-secondary" className="btn-minus" onClick={dec}>
                        <strong>−</strong>
                    </Button>
                </div>
                <span className="form-control amount">{quantity}</span>
                <div className="input-group-append">
                    <Button disabled={(quantity >= stock)} variant="outline-secondary" className="btn-plus" onClick={inc}>
                        <strong>+</strong>
                    </Button>
                </div>
            </div>
    )
}

export default ItemCount;