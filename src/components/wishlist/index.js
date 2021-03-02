import { useWishListContext } from '../../context/wishListContext';
import { Link } from 'react-router-dom';
import WishListItem from './wishlistitem';
import './wishlist.css';
import { Col, Row, Container, Table, Button } from 'react-bootstrap';

const WishList = () => {
    const { wishList } = useWishListContext();

    return (
        <Container className="wishlist-resume">
            <Row className="mt-5 mb-5 justify-content-center">
                {wishList.length == 0 ?
                    <Col xs={12} className="text-center">

                        <i className="fas fa-shopping-wishlist fa-5x" style={{ "color": "#E8E9EB" }}></i>
                        <h4 className="my-4">Su lista de deseos está vacía. ¡Sigue explorando nuestra tienda para encontrar un producto ideal para ti!</h4>
                        <Link to="/" className="text-white">                            
                            <Button variant="danger">¡Sigue comprando!</Button>
                        </Link>
                    </Col>
                :
                    <Col xs={12}>
                        <h3>LISTA DE DESEOS</h3>
                        <Table responsive className="product mt-3">
                            <thead>
                                <tr>
                                    <th className="product-remove">&nbsp;</th>
                                    <th className="product-thumbnail">&nbsp;</th>
                                    <th className="product-name">Producto</th>
                                    <th className="product-price">Precio</th>
                                </tr>
                            </thead>
                            <tbody>
                                {
                                    wishList.map((item, index) => 
                                        <WishListItem item={item} key={index}></WishListItem>
                                    )
                                }
                            </tbody>
                        </Table>
                    </Col>
                }
            </Row>
        </Container>
    );
}

export default WishList;