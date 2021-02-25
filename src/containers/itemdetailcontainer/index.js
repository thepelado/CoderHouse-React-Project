import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import ItemDetail from '../../components/itemlist/item/itemdetail';
import { useFirebaseContext } from '../../context/firebaseContext';
import './itemdetailcontainer.css';
import Page404 from '../page404';

const ItemDetailContainer = () => {

    const [ item, setItem ] = useState({});
    const [ isLoading, setIsLoading ] = useState();
    const { getItemByID, addItem } = useFirebaseContext();
    const { itemId } = useParams();
 
    useEffect(() => {
        setIsLoading(true);
        getItemByID(itemId).then((querySnapshot) => {
            setItem({id: querySnapshot.id, ...querySnapshot.data()});
        }).catch(error => console.log(error)).finally(() => setIsLoading(false))
    }, []);

        if (isLoading)
        {
            return (
                <div className="row item-detail-container pt-3 pb-5">
                    <div className="container">
                        <div className="row">
                            <div className="col-12 p-5 text-center">
                                <div className="spinner-border" role="status">
                                    <span className="sr-only">Cargando...</span>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            )
        }
        if (!item)
        {
            return (
                <Page404/>
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