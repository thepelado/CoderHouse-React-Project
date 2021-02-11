import './App.css';
import Navbar from './components/navbar';
import Footer from './components/footer';
import { BrowserRouter, Route, Switch } from 'react-router-dom';
import ItemListContainer from './containers/itemlistcontainer';
import ItemDetailContainer from './containers/itemdetailcontainer';
import Cart from './components/cart';

import 'bootstrap/dist/css/bootstrap.min.css';

function App() {
  return (
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
            <Route exact path="/cart">
              <Cart/>
            </Route>
            <Route path="*" children={<div>Not found</div>} />
          </Switch>
      </section>
      <Footer/>
    </BrowserRouter>
  );
}

export default App;