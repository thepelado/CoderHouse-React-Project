import { Link } from 'react-router-dom';
import { Nav, NavDropdown } from "react-bootstrap";
import './navitems.css';

const Navitems = () => {
    return(
        <Nav className="mr-auto">
            <NavDropdown title="Categor&iacute;as" id="collasible-nav-dropdown">
                <NavDropdown.Item href="/category/Mouse">Mouse</NavDropdown.Item>
                <NavDropdown.Item href="/category/Teclados">Keyboards</NavDropdown.Item>
                <NavDropdown.Item href="/category/Webcams">Webcams</NavDropdown.Item>
                <NavDropdown.Item href="/category/Monitores">Monitores</NavDropdown.Item>
            </NavDropdown>
        </Nav>
    );
}

export default Navitems;