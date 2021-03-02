import { Link } from 'react-router-dom';
import NumberFormat from 'react-number-format';

const OrderDetailItem = ({orderItem}) => {
    return (
        <tr className="item">
            <td>
                <img className='photo img-fluid' src={orderItem.item.photo} alt={orderItem.item.title}></img>
            </td> 
            <td className="align-middle">
                <Link to={`/item/${orderItem.item.id}`} className="text-secondary">{orderItem.item.title}</Link>
            </td>
            <td className="align-middle">
                <strong>
                    <NumberFormat value={orderItem.item.price } decimalSeparator={','} displayType={'text'} thousandSeparator={'.'} prefix={'$'} />
                </strong>
            </td>
            <td className="align-middle">
                <strong>{orderItem.qty}</strong>
            </td> 
            <td className="align-middle">
                <strong>
                    <NumberFormat value={orderItem.qty * orderItem.item.price } decimalSeparator={','} displayType={'text'} thousandSeparator={'.'} prefix={'$'} />
                </strong>
            </td> 
        </tr>
    )
}

export default OrderDetailItem;