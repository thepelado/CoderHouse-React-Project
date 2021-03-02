import React, { useState, useEffect } from 'react';
import { useFirebaseContext } from '../../context/firebaseContext';
import { useParams } from 'react-router-dom';
import ItemList from '../../components/itemlist';
import './itemlistcontainer.css';
import { Col, Row } from 'react-bootstrap';

const ItemListContainer = () => {

    const [ items, setItems ] = useState([]);
    const [ categoryTitle, setCategoryTitle ] = useState();
    const [ isLoading, setIsLoading ] = useState();
    const { category } = useParams();
    const { getAllItems, getItemsByCategory } = useFirebaseContext();
    
    useEffect(() => {
        setIsLoading(true);
        if (category) {
            setCategoryTitle(category);
            getItemsByCategory(category).then((querySnapshot) => {
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
        } else {
            getAllItems().then((querySnapshot) => {
                if (querySnapshot.length === 0) {
                    console.log('No hay datos');
                    setIsLoading(false)
                } else {
                    setItems(querySnapshot.docs.map(doc => ({ id: doc.id, ...doc.data() })))
                    setIsLoading(false)
                }
            }).catch(error => console.log(error));
        }
    }, [category]);

    if (isLoading)
    {
        return (
            <Row className="list-items flex-wrap">
                <Col xs={12} className="text-center mt-5">                
                    <div className="spinner-border" role="status">
                        <span className="sr-only">Cargando...</span>
                    </div>
                </Col>
            </Row>
        )
    }

    return (
        <Row className="list-items mt-2 flex-wrap">
            { category &&
                <Col xs={12}>
                    <h2>{categoryTitle}</h2>
                    <hr/>
                </Col>
            }
            <Col xs={12}>
                <Row className="mt-2">
                    { items && items.length > 0 ?
                        <ItemList itemsData={items}/>
                        :
                        <p className="w-100 text-center">No hay productos en esta categoría</p>              
                    }
                </Row> 
            </Col>

        </Row>
    )
}

export default ItemListContainer;