import React, { useState, useEffect } from 'react';
import { useFirebaseContext } from '../../context/firebaseContext';
import { useParams } from 'react-router-dom';
import ItemList from '../../components/itemlist';
import './itemlistcontainer.css';

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
            { category &&
                <div className="col-12">
                    <h2>{categoryTitle}</h2>
                    <hr/>
                </div>
            }
            { items.length > 0 ?
                    <ItemList itemsData={items}/>
                :
                    <div className="col-12 text-center">
                        <h2>No hay productos en esta categoría</h2> 
                    </div>                    
            }

        </div>
    )
}

export default ItemListContainer;