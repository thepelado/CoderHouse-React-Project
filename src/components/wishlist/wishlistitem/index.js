import { useWishListContext } from '../../../context/wishListContext';
import { Link } from 'react-router-dom';
import './wishlistitem.css';

const WishListItem = ({item}) => {
    const { removeItemWishList} = useWishListContext();

    const handleRemoveItemWishList = () => {
        removeItemWishList(item);
    }

    return (
        <tr className="item">
            <td className="align-middle">
                <button onClick={handleRemoveItemWishList}><i className="fas fa-times"></i></button>
            </td>
            <td>
                <img className='photo img-fluid' src={item.photo} alt={item.title}></img>
            </td> 
            <td className="align-middle">
                <Link to={`/item/${item.id}`} className="text-secondary">{item.title}</Link>
            </td>
            <td className="align-middle">
                <strong>$ {item.price}</strong>
            </td>
        </tr>
    )
}

export default WishListItem;