import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import ItemDetail from '../../components/itemlist/item/itemdetail';
import './itemdetailcontainer.css';
import { productos } from '../../data/productos';

const ItemDetailContainer = () => {

    const [ item, setItem ] = useState({});
    const [ isLoading, setIsLoading ] = useState();
    const { itemId } = useParams();
    
    useEffect(() => {
        setIsLoading(true);
        const query = new Promise((resolve, reject) => {
            resolve(productos);
        });

        const timeout = setTimeout( () => { 
            query
            .then( (res) => {
                let producto = res.find(producto => producto.id == itemId);
                setItem(producto);
                setIsLoading(false);
            })
            .catch( (err) => console.log(err))
        }, 2000);

        return () => clearTimeout(timeout);
    }, [itemId]);

        if (isLoading)
        {
            return (
                <p>Cargando</p>
            )
        }
        return (
            <div className="row item-detail-container pt-3 pb-5">
                <div className="container">
                    <div className="row">
                        <ItemDetail item={item} />
                    </div>
                </div>
            </div>
        )
}

export default ItemDetailContainer;