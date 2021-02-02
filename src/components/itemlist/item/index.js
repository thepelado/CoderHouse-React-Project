import React, { useState } from 'react';
import ItemCount from "./itemcount";
import './item.css';

const Item = ({item, onChangeItem}) => {

    const [quantity, setQuantity] = useState(1);

    const onAdd = (item, quantityToAdd, stock) => {
        setQuantity(quantityToAdd); //Update state of the quantity to add
        onChangeItem(item, quantityToAdd); //Update values in parent element
    }

    return (
        <div className='card rounded h-100 shadow-sm p-0 item'>
            {item.stock < 10 &&
                <div className="position-absolute bg-danger px-2 py-1 rounded" style={{ "right": "0" }}>
                    <span className="text-white">¡Últimas unidades!</span>
                </div>
            }
            <div className='card-img-top'>
                <img className='img-fluid' src={item.photo} alt={item.title}></img>
            </div>
            <div className='card-body'>
                <h5 className='card-title'>{item.title}</h5>
                <p className='card-text'>
                    <span className='categories'>{item.category} / {item.brand}</span>
                    <span className='price'>$ {item.price}</span>
                    <span className='stock'>{item.stock} unidades disponibles</span>
                </p>
            </div>
            <div className='card-footer'>
                <ItemCount stock={item.stock} initialValue={quantity} onAdd={onAdd} item={item}/>
            </div>
        </div>
    );
}

export default Item;