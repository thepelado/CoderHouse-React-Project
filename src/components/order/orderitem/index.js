import { Link } from 'react-router-dom';
import NumberFormat from 'react-number-format';
import Moment from 'react-moment';
import './orderitem.css';

const OrderItem = ({orderItem}) => {
    return (
        <tr className="item">
            <td>
                <Link to={`/order/${orderItem.id}`} className="text-secondary">
                    <i className="fas fa-search"></i>
                </Link>
            </td>
            <td>
                <strong>
                    #{orderItem.id}
                </strong>
            </td>
            <td>
                <strong>
                    <Moment format="DD/MM/YYY HH:mm:ss">{orderItem.date.seconds * 1000}</Moment>
                </strong>
            </td> 
            <td>
                <strong>
                    <NumberFormat value={orderItem.total } decimalSeparator={','} displayType={'text'} thousandSeparator={'.'} prefix={'$'} />
                </strong>
            </td>            
        </tr>
    )
}

export default OrderItem;