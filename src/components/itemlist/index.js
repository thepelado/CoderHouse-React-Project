
import Item from './item/';
import { Col } from 'react-bootstrap';

const ItemList = ({itemsData}) => {

    return (
        itemsData.map( (item, key) => {
            return <Col xs={12} md={3} className="mb-3" key={key} >
                <Item key={key} item={item}/>
            </Col>
        })
    )
}

export default ItemList;