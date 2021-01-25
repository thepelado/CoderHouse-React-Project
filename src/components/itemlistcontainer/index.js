import Item from './item/';

const products = [
    {
        id: 1,
        title: "Teclado Gamer Redragon Yama K550 Rgb Qwerty Outemu Purple",
        brand: "Redragon",
        category: "Keyboards",
        stock: 10,
        price: "9599",
        photo: "https://www.gaming-city.com.ar/web/wp-content/uploads/2021/01/D_927295-MLA32722683273_102019-O.jpg"
    },
    {
        id: 2,
        title: "Webcam Logitech C505 Hd 720p 30fps Black Cámara Web",
        brand: "Logitech",
        category: "Webcams",
        stock: 10,
        price: "4699",
        photo: "https://www.gaming-city.com.ar/web/wp-content/uploads/2021/01/D_612187-MLA44698347138_012021-O.jpg"
    },
    {
        id: 3,
        title: "Monitor 27p Benq Zowie Xl2731 144hz Gamer Full Hd",
        brand: "Benq",
        category: "Monitor",
        stock: 10,
        price: "84800",
        photo: "https://www.gaming-city.com.ar/web/wp-content/uploads/2021/01/D_910628-MLA44692841921_012021-O.jpg"
    },
    {
        id: 3,
        title: "Teclado Mecanico Gamer Redragon Shrapnel K589 Rgb Outemu Bl",
        brand: "Redragon",
        category: "Keyboards",
        stock: 10,
        price: "7990",
        photo: "https://www.gaming-city.com.ar/web/wp-content/uploads/2021/01/D_684851-MLA44692946564_012021-O.jpg"        
    }
];

const ItemListContainer = () => {
    return (
        products.map( (product) => 
            <Item product={product} />
        )
    );
}

export default ItemListContainer;