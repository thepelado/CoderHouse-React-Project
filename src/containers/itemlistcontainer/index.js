import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import ItemList from '../../components/itemlist';

const ItemListContainer = () => {

    const [ items, setItems ] = useState([]);
    const [ isLoading, setIsLoading ] = useState();
    const { categoryId } = useParams();
    
    useEffect(() => {
        setIsLoading(true);
        const query = new Promise((resolve, reject) => {
            resolve([    
            {
                id: 1,
                title: "Logitech B100 negro – Mouse",
                brand: "Logitech",
                category: "Mouse",
                stock: 10,
                price: "600",
                photo: "https://media.lifeinformatica.com/contents/Life/LOGITECH-910-003357/imgs/910-003357-01.jpg",
            },
            {
                id: 2,
                title: "Teclado Gamer Redragon Yama K550 Rgb Qwerty Outemu Purple",
                brand: "Redragon",
                category: "Keyboards",
                stock: 10,
                price: "9599",
                photo: "https://www.gaming-city.com.ar/web/wp-content/uploads/2021/01/D_927295-MLA32722683273_102019-O.jpg"
            },
            {
                id: 3,
                title: "Webcam Logitech C505 Hd 720p 30fps Black Cámara Web",
                brand: "Logitech",
                category: "Webcams",
                stock: 10,
                price: "4699",
                photo: "https://www.gaming-city.com.ar/web/wp-content/uploads/2021/01/D_612187-MLA44698347138_012021-O.jpg"
            },
            {
                id: 4,
                title: "Monitor 27p Benq Zowie Xl2731 144hz Gamer Full Hd",
                brand: "Benq",
                category: "Monitor",
                stock: 10,
                price: "84800",
                photo: "https://www.gaming-city.com.ar/web/wp-content/uploads/2021/01/D_910628-MLA44692841921_012021-O.jpg"
            },
            {
                id: 5,
                title: "Teclado Mecanico Gamer Redragon Shrapnel K589 Rgb Outemu Bl",
                brand: "Redragon",
                category: "Keyboards",
                stock: 5,
                price: "7990",
                photo: "https://www.gaming-city.com.ar/web/wp-content/uploads/2021/01/D_684851-MLA44692946564_012021-O.jpg"        
            }]);
        });

        const timeout = setTimeout( () => { 
            query
            .then( (res) => { setItems(res); setIsLoading(false); })
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
        <div className="list-items mt-2 d-flex">
            <ItemList itemsData={items}/>
        </div>
    )
}

export default ItemListContainer;