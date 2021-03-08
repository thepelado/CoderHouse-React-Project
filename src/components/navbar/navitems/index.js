import { useState, useEffect } from 'react';
import { Nav, NavDropdown } from "react-bootstrap";
import {useFirebaseContext } from "../../../context/firebaseContext";
import './navitems.css';

const Navitems = () => {
    const { getAllCategories } = useFirebaseContext();
    const [categories, setCategories] = useState([]);

    useEffect(() => {
        getAllCategories().then( (result) => setCategories(result))
        .catch((error) => console.log(error))
        .finally();
    }, []);

    return(
        <Nav className="mr-auto">
            <NavDropdown title="Categor&iacute;as" id="collasible-nav-dropdown">
                {
                    categories.map( (item, key) => {
                        let route = `/categories/${item.key}`;
                        return <NavDropdown.Item key={item.key} href={route}>{item.description}</NavDropdown.Item>
                    })
                }
            </NavDropdown>
        </Nav>
    );
}

export default Navitems;