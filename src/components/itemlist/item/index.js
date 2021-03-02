import React from 'react';
import NumberFormat from 'react-number-format';
import { Link } from 'react-router-dom';
import './item.css';
import { Badge } from 'react-bootstrap';

const Item = ({item}) => {

    return (
        <Link to={`/item/${item.id}`} className="item">
            <div className='card rounded h-100 shadow-sm p-0'>
                {item.stock < 10 &&                    
                    <Badge variant="danger" className="position-absolute px-3 py-2" style={{ "right": "0" }}>¡Últimas unidades!</Badge>
                }
                <div className='card-img-top'>
                    <img className='img-fluid' src={item.photo} alt={item.title}></img>
                </div>
                <div className='card-body'>
                    <h5 className='card-title'>{item.title}</h5>
                    <p className='card-text'>
                        <span className='categories'>{item.category} / {item.brand}</span>
                        <span className='price'>
                            <NumberFormat isNumericString={true} decimalScale={2} value={ item.price } decimalSeparator={','} displayType={'text'} thousandSeparator={'.'} prefix={'$'} />
                        </span>
                        <span className='stock'>{item.stock} unidades disponibles</span>
                    </p>
                </div>
            </div>
        </Link>
    );
}

export default Item;