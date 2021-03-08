import React, { useState, useEffect } from 'react';
import { useLocation } from "react-router-dom";
import ItemList from '../../components/itemlist';
import { useFirebaseContext } from '../../context/firebaseContext';
import './itemsearchcontainer.css';
import { Col, Row } from 'react-bootstrap';

const ItemSearchContainer = () => {

    const [ items, setItems ] = useState([]);
    const [ criterio, setCriterio ] = useState();
    const [ isLoading, setIsLoading ] = useState();
    const [queryParams, setQueryParams] = useState(new URLSearchParams(useLocation().search));
    const { getAllItems } = useFirebaseContext();
    
    useEffect(() => {
        setIsLoading(true);
        setCriterio(queryParams.get("s"));
        if (criterio) {
            /*Firebase no tiene forma de hacer consultas del tipo OR o con Like %% y multiples campos por
            lo que decidi obtener todos los productos en stock y filtrar sobre estos */  
            getAllItems().then((result) => {
                if (result.length === 0) {
                    console.log('No se encontraron resultados');
                    setItems([]);
                } else {
                    setItems(result.filter((result) => 
                        result.title.toLowerCase().indexOf(criterio.toLowerCase())>=0 || 
                        result.brand.toLowerCase().indexOf(criterio.toLowerCase())>=0
                    ));
                }
            }).catch(error => console.log(error)).finally(() => setIsLoading(false))
        }
    }, [criterio]);



    if (isLoading)
    {
        return (
            <Row className="list-items mt-2 flex-wrap">
                <Col xs={12} className="text-center">                
                    <div className="spinner-border" role="status">
                        <span className="sr-only">Cargando...</span>
                    </div>
                </Col>
            </Row>
        )
    }

    return (
        <Row className="list-items mt-2 flex-wrap">
            { criterio &&
                <Col xs={12}>
                    <h2>Resultados de búsqueda: "{criterio}"</h2>
                    <hr/>
                </Col>
            }
            <Col xs={12}>
                <Row>
                    { items && items.length > 0?
                        <ItemList itemsData={items}/>
                    :
                        <p className="w-100 text-center">No se encontrarón productos para su busqueda</p>                
                    }
                </Row>
            </Col>
        </Row>
    )
}

export default ItemSearchContainer;