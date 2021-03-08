import React from 'react';
import './order.css';
import { Table } from 'react-bootstrap';
import OrderItem from './orderitem';

const Order = ({order}) => {
    return (
        <Table responsive className="product mt-3">
            <thead>
                <tr>                    
                    <th className="order-view ">&nbsp;</th>
                    <th className="order-name">Orden</th>
                    <th className="order-date">Fecha</th>                    
                    <th className="order-total">Total</th>
                </tr>
            </thead>
            <tbody>
                <OrderItem orderItem={order}/>
            </tbody>
        </Table>
    );
}

export default Order;