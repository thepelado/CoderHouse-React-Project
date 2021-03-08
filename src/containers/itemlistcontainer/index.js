import React, { useState, useEffect } from 'react';
import { useFirebaseContext } from '../../context/firebaseContext';
import { useParams } from 'react-router-dom';
import ItemList from '../../components/itemlist';
import './itemlistcontainer.css';
import { Col, Row, Carousel } from 'react-bootstrap';

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
            getItemsByCategory(category).then((itemList) => {
                if (itemList.length === 0) {
                    console.log('No hay resultados');
                    setItems([]);
                } else {                      
                    setItems(itemList);
                }
            }).catch(error => {
                console.log("Error", error);
            }).finally(() => setIsLoading(false))
        } else {
            getAllItems().then((itemList) => {
                if (itemList.length === 0) {
                    console.log('No hay datos');
                    setIsLoading(false)
                } else {
                    setItems(itemList)
                    setIsLoading(false)
                }
            }).catch(error => {
                console.log(error)
            });
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
        <>
            {!category && 
                <Row>
                    <Carousel className="w-100">
                        <Carousel.Item>
                            <img
                            className="d-block w-100"
                            src="https://media.lifeinformatica.com/contents/2020/04/mejorespcyportatiles.jpg"
                            alt="Mejores Portatiles"
                            />
                        </Carousel.Item>
                        <Carousel.Item>
                            <img
                            className="d-block w-100"
                            src="https://media.lifeinformatica.com/contents/2020/10/header-amd.jpg"
                            alt="AMD Ryzen"
                            />
                        </Carousel.Item>
                        <Carousel.Item>
                            <img
                            className="d-block w-100"
                            src="https://media.lifeinformatica.com/contents/2021/02/RTX30series-1-min.jpg"
                            alt="G-FORCE RTX"
                            />
                        </Carousel.Item>
                    </Carousel>
                </Row>
            }
            <Row className="list-items mt-2 flex-wrap">
                { category &&
                    <Col xs={12}>
                        <h2 className="categoryTitle">{categoryTitle}</h2>
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
        </>
    )
}

export default ItemListContainer;