import './navcart.css';

const Cart = () => {
    return(
        <ul className='header-icons'>
            <li className='header-icon' data-toggle='tooltip' data-title='Wishlist' data-original-title='' title=''>
                <a href='/#'>
                    <i className='fas fa-heart'></i>
                </a>
            </li>
            <li className='header-icon user' data-toggle='tooltip' data-title='Wishlist' data-original-title='' title=''>
                <a href='/#'>
                    Entra o registrate <i className='fas fa-user'></i>
                </a>
            </li>
            <li className='header-icon cart' data-toggle='tooltip' data-title='Wishlist' data-original-title='' title=''>
                <a href='/#'>
                    <i className='cart-icon fas fa-shopping-cart'></i>
                    <span className='cart-counter'>0</span>
                    <span className='cart-amount'>$ 0,00</span>
                </a>
            </li>            
        </ul>
    );
}

export default Cart;