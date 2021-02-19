import { useState } from 'react';
import './searchform.css';

const FormSearch = ({icono=false}) => {
    const [criterio, setCriterio] = useState('');

    const handleInput = (e) => {
        setCriterio(e.target.value);
    }

    return (
        <div className={icono? 'product_search header-search-container' : 'product_search'}>
            <form role="search" method="get" className="search-form" action="/buscar">
                <input type="text" className="search-field" placeholder="Buscar productos…" value={criterio} onChange={handleInput}  name="s" />
                { icono && <button type="submit" value="Buscar" className="icon-buscar"><i className="fas fa-search"></i></button>}
                { !icono && <button type="submit" value="Buscar" className="btn-buscar">Buscar</button>}
            </form>
        </div>
    )
}

export default FormSearch;