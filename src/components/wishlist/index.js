import { useWishListContext } from '../../context/wishListContext';
import { Link } from 'react-router-dom';
import WishListItem from './wishlistitem';
import './wishlist.css';

const WishList = () => {
    const { wishList } = useWishListContext();

    return (
        <div className="container wishlist-resume">
            <div className="row mt-5 mb-5 justify-content-center">
                {wishList.length == 0 ?
                    <div className="col-md-12  text-center">

                        <i className="fas fa-shopping-wishlist fa-5x" style={{ "color": "#E8E9EB" }}></i>
                        <h4 className="my-4">Su lista de deseos está vacía. ¡Sigue explorando nuestra tienda para encontrar un producto ideal para ti!</h4>
                        <Link to="/" className="text-white">  <button type="button" className="btn btn-danger">¡Sigue comprando!</button> </Link>
                    </div>
                :
                    <div className="col-md-12">
                        <table className="table product mt-3">
                            <thead>
                                <tr>
                                    <th className="product-remove">&nbsp;</th>
                                    <th className="product-thumbnail">&nbsp;</th>
                                    <th className="product-name">Producto</th>
                                    <th className="product-price">Precio</th>
                                </tr>
                            </thead>
                            <tbody>
                                {
                                    wishList.map((item, index) => 
                                        <WishListItem item={item} key={index}></WishListItem>
                                    )
                                }
                            </tbody>
                        </table>
                    </div>
                }
            </div>
        </div>
    );
}

export default WishList;