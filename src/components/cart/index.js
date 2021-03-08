import NumberFormat from 'react-number-format';
import { useFirebaseContext } from '../../context/firebaseContext';
import { useCartContext } from '../../context/cartContext';
import { Link, useHistory } from 'react-router-dom';
import CartItem from './cartitem';
import { Col, Row, Container, Table, Button } from 'react-bootstrap';
import './cart.css';


const Cart = () => {
    const history = useHistory();
    const { cart, loggedUser, clearCart } = useCartContext();
    const { updateStock, createOrder } = useFirebaseContext();
    const handleClearCart = () => {
        clearCart();
    }

    const handlePushOrder = () => {
        //Agarras los 3 campos
        let newOrder = { buyer: loggedUser, items: [...cart], total: cart.totalPrice, state: "pending"}
        //Actualizo el stock de los productos
        updateStock(cart).then( (result) => {
            //Ya actualizado el stock, almaceno la orden de compra
            return createOrder(newOrder);
        })
        .then( (order) => {
            //Borro el carrito
            clearCart();
            //Redirijo al componente para mostrar la orden de compra
            history.push(`/order/${order.id}`)
        })
        .catch( (error) => console.error(error));
    }

    return (
        <Container className="cart-resume">
            <Row className="mt-5 mb-5 justify-content-center">
                {cart.length == 0 ?
                    <Col xs={12} className="text-center">
                        <i className="fas fa-shopping-cart fa-5x" style={{ "color": "#E8E9EB" }}></i>
                        <h4 className="my-4">El carro está vacío. ¡Sigue explorando nuestra tienda para encontrar un producto ideal para ti!</h4>
                        <Link to="/" className="text-white">  
                            <Button variant="danger">¡Sigue comprando!</Button>
                        </Link>
                    </Col>
                :
                    <Col xs={12}>
                        <Row>
                            <h3>RESUMEN DE LA COMPRA</h3>
                            { loggedUser.id &&
                                <h5 className="mt-4 mb-2 w-100">Comprar como <Link to={'/profile'}>{loggedUser.email}</Link></h5>
                            }
                            <Table responsive className="cart-product mt-3">
                                <thead>
                                    <tr>
                                        <th className="cart-product-remove">&nbsp;</th>
                                        <th className="cart-product-thumbnail">&nbsp;</th>
                                        <th className="cart-product-name">Producto</th>
                                        <th className="cart-product-price">Precio</th>
                                        <th className="cart-product-quantity">Cantidad</th>
                                        <th className="cart-product-subtotal">Total</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {
                                        cart.map((cartItem, index) => 
                                            <CartItem cartItem={cartItem} key={index}></CartItem>
                                        )
                                    }
                                </tbody>
                                <tfoot>
                                    <tr>
                                        <td colSpan="5" className="text-right">Subtotal</td>
                                        <td className="cart-total">
                                            <NumberFormat value={cart.totalPrice} decimalSeparator={','} displayType={'text'} thousandSeparator={'.'} prefix={'$'} />
                                        </td>
                                    </tr>
                                </tfoot>
                            </Table>
                        </Row>
                        { !loggedUser.id?
                            <>
                                <Row className="justify-content-center my-3">
                                    <p>¿Tienes cuenta? <Link to={'/login?tab=login'} className="btn btn-primary">Iniciar sesión</Link>, </p>
                                    <p>¿Todavía no eres cliente? <Link to={'/login?tab=register'} className="btn btn-success">Registrate</Link></p> 
                                </Row>
                            </>
                            :
                            <>
                                <Row className="justify-content-center my-3">
                                    <Button variant="success" onClick={handlePushOrder}>Terminar compra</Button>
                                </Row>
                            
                                <Row className="justify-content-center my-3">
                                    <Button variant="danger" onClick={handleClearCart}>Vaciar carro de compras</Button>
                                </Row>
                            </>                            
                        }
                    </Col>
                }
            </Row>
        </Container>
    );
}

export default Cart;