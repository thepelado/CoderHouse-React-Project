import React, { useState, useEffect } from 'react';
import { useLocation } from "react-router-dom";
import ItemList from '../../components/itemlist';
import { productos } from '../../data/productos';
import './itemsearchcontainer.css';

const ItemSearchContainer = () => {

    const [ items, setItems ] = useState([]);
    const [ criterio, setCriterio ] = useState();
    const [ isLoading, setIsLoading ] = useState();
    const [queryParams, setQueryParams] = useState(new URLSearchParams(useLocation().search));
    
    useEffect(() => {
        setIsLoading(true);

        const query = new Promise((resolve, reject) => {
            resolve(productos);
        });

        const timeout = setTimeout( () => { 
            query
            .then( (res) => {
                setCriterio(queryParams.get("s"));                
                let filterItems = res.filter( item => item.title.toLowerCase().indexOf(criterio.toLowerCase())>-1);
                if (filterItems.length > 0) {
                    setItems(filterItems);
                } else {
                    setItems(res);
                }
                setIsLoading(false);                
            })
            .catch( (err) => console.log(err))
        }, 2000);

        return () => clearTimeout(timeout);
    }, [criterio]);



    if (isLoading)
    {
        return (
            <div className="list-items mt-2 d-flex flex-wrap">
                <div className="col-12 p-5 text-center">
                    <div className="spinner-border" role="status">
                        <span className="sr-only">Cargando...</span>
                    </div>
                </div>
            </div>
        )
    }

    return (
        <div className="list-items mt-2 d-flex flex-wrap">
            { criterio &&
                <div className="col-12">
                    <h2>Resultados de búsqueda: "{criterio}"</h2>
                    <hr/>
                </div>
            }
            <ItemList itemsData={items}/>
        </div>
    )
}

export default ItemSearchContainer;