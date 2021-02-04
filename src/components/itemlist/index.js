
import Item from './item/';

const ItemList = ({itemsData}) => {

    return (
        itemsData.map( (item, key) => {
            return <div className="col-12 col-md-3 mb-5" key={key} >
                <Item key={key} item={item}/>
            </div>
        })
    )
}

export default ItemList;