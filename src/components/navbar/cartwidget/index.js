import { useCartContext } from '../../../context/cartContext';
import NumberFormat from 'react-number-format';
import { Link } from 'react-router-dom';
import SearchForm from '../../searchform/';
import './cartwidget.css';

const Cartwidget = () => {
    const { cart } = useCartContext();
    return(
        <ul className='header-icons'>
            <li className="d-none d-md-flex header-search">
                <SearchForm icono={true}/>
            </li>
            <li className='header-icon d-none d-md-block'>
                <Link to={'/wishlist'} title='Lista de deseos'>
                    <i className='fas fa-heart'></i>
                </Link>
            </li>
            <li className='header-icon user'>
                <Link to={'/login'} title='Datos del usuario'>
                    <i className='fas fa-user'></i>
                </Link>
            </li>
            <>
                { cart.length > 0 && <li className='header-icon cart' title='Estado del carro de compras'>
                    <Link to={'/cart'}>
                        <i className='cart-icon fas fa-shopping-cart'></i>
                        <span className='cart-counter'>{cart.count}</span>
                        <span className='cart-amount'>
                            <NumberFormat value={cart.totalPrice} decimalSeparator={','} displayType={'text'} thousandSeparator={'.'} prefix={'$'} />
                        </span>
                    </Link>
                </li>
                }
            </>
        </ul>
    );
}

export default Cartwidget;