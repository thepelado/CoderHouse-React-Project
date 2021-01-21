import './navitems.css';

const Navitems = () => {
    return(
        <ul className='navbar-nav mr-auto'>
            <li className='nav-item d-block d-lg-none'>
                <a className='nav-link' href='/#'>Novedades</a>
            </li>
            <li className='nav-item d-block d-lg-none'>
                <a className='nav-link' href='/#'>Destacados</a>
            </li>
            <li className='nav-item dropdown'>
                <a className='nav-link dropdown-toggle' href='/#' id='navbarDropdown' role='button' data-toggle='dropdown' aria-haspopup='true' aria-expanded='false'>
                Categor&iacute;as
                </a>
                <div className='dropdown-menu py-0' aria-labelledby='navbarDropdown'>
                <a href='/#' className='dropdown-item'>Ordernadores y Portátiles</a>
                <a href='/#' className='dropdown-item'>Tablets y Móviles</a>
                <a href='/#' className='dropdown-item'>Periféricos</a>
                <a href='/#' className='dropdown-item'>Accesorios</a>
                </div>
            </li>
        </ul>     
    );
}

export default Navitems;