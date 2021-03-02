import Navlogo from './navlogo/';
import Navitems from './navitems/';
import Cartwidget from './cartwidget/';
import { Navbar as NavbarBootstrap, Nav } from "react-bootstrap";
import './navbar.css';

const Navbar = () => {
    return(
        <NavbarBootstrap variant="dark" expand="lg" className="navbar">
            <Navlogo/>
            <NavbarBootstrap.Toggle aria-controls="basic-navbar-nav" />
            <NavbarBootstrap.Collapse id="basic-navbar-nav">
                <Navitems/>
            </NavbarBootstrap.Collapse>
            <Cartwidget/>
        </NavbarBootstrap>
    );
}

export default Navbar;