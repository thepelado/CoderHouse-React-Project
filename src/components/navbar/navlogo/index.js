import { Link } from 'react-router-dom';
import { Navbar as NavbarBootstrap, Nav } from "react-bootstrap";
import './navlogo.css'

const Navlogo = () => {
    return(
        <NavbarBootstrap.Brand href="/" className="navbar-brand">
            <img src='/assets/img/logo.png' className='logo' alt="Life Informática"/>
        </NavbarBootstrap.Brand>
    );
}

export default Navlogo