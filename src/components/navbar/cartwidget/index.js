import { useCartContext } from '../../../context/cartContext';
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
            <li className='header-icon d-none d-md-block' data-toggle='tooltip' data-title='Wishlist' data-original-title='' title=''>
                <a href='/#'>
                    <i className='fas fa-heart'></i>
                </a>
            </li>
            <li className='header-icon user' data-toggle='tooltip' data-title='User' data-original-title='' title=''>
                <Link to={'/login'}>
                    <i className='fas fa-user'></i>
                </Link>
            </li>
            <li className='header-icon cart' data-toggle='tooltip' data-title='Shopping Cart' data-original-title='' title=''>
                <Link to={'/cart'}>
                    <i className='cart-icon fas fa-shopping-cart'></i>
                    <span className='cart-counter'>{cart.length}</span>
                    <span className='cart-amount'>$ {cart.totalPrice}</span>
                </Link>
            </li>            
        </ul>
    );
}

export default Cartwidget;