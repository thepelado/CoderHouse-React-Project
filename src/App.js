import './App.css';
import Navbar from './components/navbar';
import Footer from './components/footer';
import { BrowserRouter, Route, Switch } from 'react-router-dom';
import ItemListContainer from './containers/itemlistcontainer';
import ItemDetailContainer from './containers/itemdetailcontainer';
import ItemSearchContainer from './containers/itemsearchcontainer';
import Cart from './components/cart';
import Page404 from './containers/page404';
import CartProvider from './context/cartContext';

import 'bootstrap/dist/css/bootstrap.min.css';


function App() { 

  return (
    <CartProvider>
      <BrowserRouter>
        <header>
          <Navbar/>
        </header>
        <section className="container-fluid">
            <Switch>
              <Route exact path="/">
                <ItemListContainer/>
              </Route>
              <Route exact path="/category/:categoryId">
                <ItemListContainer/>
              </Route>
              <Route exact path="/item/:itemId">
                <ItemDetailContainer/>
              </Route>
              <Route path="/buscar">
                <ItemSearchContainer/>
              </Route>
              <Route exact path="/cart">
                <Cart/>
              </Route>
              <Route path="*" children={<Page404/>} />
            </Switch>
        </section>
        <Footer/>
      </BrowserRouter>
    </CartProvider>
  );
}

export default App;