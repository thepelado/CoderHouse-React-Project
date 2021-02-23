import { useCartContext } from '../../context/cartContext';
import { Link } from 'react-router-dom';
import CartItem from './cartitem';
import './cart.css';

const Cart = () => {
    const { cart, clearCart } = useCartContext();

    const handleClearCart = () => {
        clearCart();
    }

    return (
        <div className="container cart-resume">
            <div className="row mt-5 mb-5 justify-content-center">
                {cart.length == 0 ?
                    <div className="col-md-12  text-center">

                        <i className="fas fa-shopping-cart fa-5x" style={{ "color": "#E8E9EB" }}></i>
                        <h4 className="my-4">El carro está vacío. ¡Sigue explorando nuestra tienda para encontrar un producto ideal para ti!</h4>
                        <Link to="/" className="text-white">  <button type="button" className="btn btn-danger">¡Sigue comprando!</button> </Link>
                    </div>
                :
                    <div className="col-md-12">
                        <h3>RESUMEN DE LA COMPRA</h3>
                        <table className="table product mt-3">
                            <thead>
                                <tr>
                                    <th className="product-remove">&nbsp;</th>
                                    <th className="product-thumbnail">&nbsp;</th>
                                    <th className="product-name">Producto</th>
                                    <th className="product-price">Precio</th>
                                    <th className="product-quantity">Cantidad</th>
                                    <th className="product-subtotal">Total</th>
                                </tr>
                            </thead>
                            <tbody>
                                {
                                    cart.map((cartItem, index) => 
                                        <CartItem cartItem={cartItem} key={index}></CartItem>
                                    )
                                }
                            </tbody>
                        </table>
                        <div className="d-flex justify-content-center my-3">
                            <button className="btn btn-danger" onClick={handleClearCart}>Vaciar carro de compras</button>
                        </div>
                    </div>
                }
            </div>
        </div>
    );
}

export default Cart;