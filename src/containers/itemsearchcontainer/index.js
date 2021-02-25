import React, { useState, useEffect } from 'react';
import { useLocation } from "react-router-dom";
import ItemList from '../../components/itemlist';
import { useFirebaseContext } from '../../context/firebaseContext';
import './itemsearchcontainer.css';

const ItemSearchContainer = () => {

    const [ items, setItems ] = useState([]);
    const [ criterio, setCriterio ] = useState();
    const [ isLoading, setIsLoading ] = useState();
    const [queryParams, setQueryParams] = useState(new URLSearchParams(useLocation().search));
    const { getItemsByTerm } = useFirebaseContext();
    
    useEffect(() => {
        setIsLoading(true);
        setCriterio(queryParams.get("s"));
        if (criterio) {
            getItemsByTerm(criterio).then((querySnapshot) => {
                if (querySnapshot.length === 0) {
                    console.log('Error');
                } else {
                    if (querySnapshot.docs.length > 0) {                        
                        setItems(querySnapshot.docs.map(doc => ({ id: doc.id, ...doc.data() })));
                    } else {
                        setItems([]);
                    }
                }
            }).catch(error => console.log(error)).finally(() => setIsLoading(false))
        }
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