import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import ItemDetail from '../../components/itemlist/item/itemdetail';
import './itemdetailcontainer.css';

const ItemDetailContainer = () => {

    const [ item, setItem ] = useState({});
    const [ isLoading, setIsLoading ] = useState();
    const { itemId } = useParams();
    
    useEffect(() => {
        setIsLoading(true);
        const query = new Promise((resolve, reject) => {
            resolve({
                id: 1,
                title: "Logitech B100 negro – Mouse",
                brand: "Logitech",
                category: "Mouse",
                stock: 10,
                price: "600",
                photo: "https://media.lifeinformatica.com/contents/Life/LOGITECH-910-003357/imgs/910-003357-01.jpg",
                description: "Un ratón básico de oficina. Dispone de un control con seguimiento óptico suave y sensible y con una construcción para ambidiestros. Gracias a su conectividad Plug and Play estará listo para usar al momento.",
                sku: "RALOG004"
            });
        });

        const timeout = setTimeout( () => { 
            query
            .then( (res) => { setItem(res); setIsLoading(false); })
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