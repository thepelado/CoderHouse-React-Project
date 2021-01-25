const Item = ({product}) => {
    return (
        <div className='card item col-3'>
            <div className='card-img-top'>
                <img className='img-fluid' src={product.photo} alt={product.title}></img>
            </div>
            <div className='card-body'>
                <h5 className='card-title'>{product.title}</h5>
                <p className='card-text'>
                    <span className='categories'>{product.category} / {product.brand}</span>
                    <span className='price'>$ {product.price}</span>
                </p>
                <a href='/#' className='btn btn-primary'><i class='fas fa-cart-plus'></i> Añadir al carrito</a>
            </div>
        </div>
    );
}

export default Item;


