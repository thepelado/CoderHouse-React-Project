import { Link } from 'react-router-dom';
import NumberFormat from 'react-number-format';
import React, { useState } from 'react';
import OrderDetailItem from './orderdetailitem';
import './orderdetail.css';
import { Col, Row, Container, Table } from 'react-bootstrap';

const OrderDetail = ({order}) => {
    return (
        <Table responsive className="product mt-3">
            <thead>
                <tr>
                    <th className="product-thumbnail">&nbsp;</th>
                    <th className="product-name">Producto</th>
                    <th className="product-price">Precio</th>
                    <th className="product-quantity">Cantidad</th>
                    <th className="product-subtotal">Total</th>
                </tr>
            </thead>
            <tbody>
                {order.items &&
                    order.items.map((item, index) => 
                        <OrderDetailItem orderItem={item} key={index}/>
                    )
                }
            </tbody>
            <tfoot>
                <tr>
                    <td colSpan="4" className="text-right">Subtotal</td>
                    <td className="order-total">
                        <NumberFormat value={order.total} decimalSeparator={','} displayType={'text'} thousandSeparator={'.'} prefix={'$'} />
                    </td>
                </tr>
            </tfoot>
        </Table>
    );
}

export default OrderDetail;