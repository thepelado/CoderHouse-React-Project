import Navlogo from './navlogo/';
import Navitems from './navitems/';
import Cartwidget from './cartwidget/';
import './navbar.css';

const Navbar = () => {
    return(
        <nav className='navbar navbar-expand-lg'>
            <Navlogo/>
            <button className='navbar-toggler' type='button' data-toggle='collapse' data-target='#navbarSupportedContent' aria-controls='navbarSupportedContent' aria-expanded='false' aria-label='Toggle navigation'>
                <span className='navbar-toggler-icon'></span>
            </button>
            <div className='collapse navbar-collapse' id='navbarSupportedContent'>
                <Navitems/>                
            </div>
            <Cartwidget/>
        </nav>
    );
}

export default Navbar;