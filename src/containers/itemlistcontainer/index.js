import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import ItemList from '../../components/itemlist';
import { productos } from '../../data/productos';

const ItemListContainer = () => {

    const [ items, setItems ] = useState([]);
    const [ categoryTitle, setcategoryTitle ] = useState();
    const [ isLoading, setIsLoading ] = useState();
    const { categoryId } = useParams();
    
    useEffect(() => {
        setIsLoading(true);
        const query = new Promise((resolve, reject) => {
            resolve(productos);
        });

        const timeout = setTimeout( () => { 
            query
            .then( (res) => { 
                setItems(res);
                if (categoryId && categoryId > 0) {
                    let productsfiltered = res.filter( product => product.categoryId === Number(categoryId));                    
                    setItems(productsfiltered);
                    let title = productsfiltered[0].category;
                    setcategoryTitle(title);
                }
                else {
                    setItems(res);
                }
                setIsLoading(false);
            })
            .catch( (err) => console.log(err))
        }, 2000);

        return () => clearTimeout(timeout);
    }, [categoryId]);

    if (isLoading)
    {
        return (
            <p>Cargando...</p>
        )
    }

    return (
        <div className="list-items mt-2 d-flex flex-wrap">
            { categoryId && categoryId > 0 &&
                <div class="col-12">
                    <h2>{categoryTitle}</h2>
                    <hr/>
                </div>
            }
            <ItemList itemsData={items}/>
        </div>
    )
}

export default ItemListContainer;