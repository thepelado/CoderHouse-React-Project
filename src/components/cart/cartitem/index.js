import { useCartContext } from '../../../context/cartContext';
import { Link } from 'react-router-dom';
import './cartitem.css';

const CartItem = ({cartItem}) => {
    const { cart, removeItem} = useCartContext();

    const handleRemoveItem = () => {
        removeItem(cartItem.item.id);
    }

    return (
        <tr className="item">
            <td className="align-middle">
                <button onClick={handleRemoveItem}><i className="fas fa-times"></i></button>
            </td>
            <td>
                <img className='photo img-fluid' src={cartItem.item.photo} alt={cartItem.item.title}></img>
            </td> 
            <td className="align-middle">
                <Link to={`/item/${cartItem.item.id}`} className="text-secondary">{cartItem.item.title}</Link>
            </td>
            <td className="align-middle">
                <strong>$ {cartItem.item.price}</strong>
            </td>
            <td className="align-middle">
                <strong>{cartItem.qty}</strong>
            </td> 
            <td className="align-middle">
                <strong>$ {cartItem.qty * cartItem.item.price }</strong>
            </td> 
        </tr>
    )
}

export default CartItem;