
import Item from './item/';

const ItemList = ({itemsData, updateItems}) => {

    return (
        itemsData.map( (item, key) => {
            return <div className="col mb-5" key={key} >
                <Item key={key} item={item} onChangeItem={updateItems} />
            </div>
        })
    )
}

export default ItemList;