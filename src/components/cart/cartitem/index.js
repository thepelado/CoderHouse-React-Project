import NumberFormat from 'react-number-format';
import { useCartContext } from '../../../context/cartContext';
import { Link } from 'react-router-dom';
import './cartitem.css';

const CartItem = ({cartItem}) => {
    const { cart, removeItem} = useCartContext();

    const handleRemoveItem = () => {
        removeItem(cartItem.item.id);
    }

    return (
        <tr className="cart-item">
            <td className="align-middle">
                <button title="Remover del carrito" onClick={handleRemoveItem}><i className="fas fa-times"></i></button>
            </td>
            <td>
                <img className='photo img-fluid' src={cartItem.item.photo} alt={cartItem.item.title}></img>
            </td> 
            <td className="align-middle">
                <Link to={`/item/${cartItem.item.id}`} className="text-secondary">{cartItem.item.title}</Link>
            </td>
            <td className="align-middle">
                <strong>
                    <NumberFormat value={cartItem.item.price } decimalSeparator={','} displayType={'text'} thousandSeparator={'.'} prefix={'$'} />
                </strong>
            </td>
            <td className="align-middle">
                <strong>{cartItem.qty}</strong>
            </td> 
            <td className="align-middle">
                <strong>
                    <NumberFormat value={cartItem.qty * cartItem.item.price } decimalSeparator={','} displayType={'text'} thousandSeparator={'.'} prefix={'$'} />
                </strong>
            </td> 
        </tr>
    )
}

export default CartItem;