import './App.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import Navbar from './components/navbar';
import Footer from './components/footer';
import { BrowserRouter, Route, Switch } from 'react-router-dom';
import ItemListContainer from './containers/itemlistcontainer';
import ItemDetailContainer from './containers/itemdetailcontainer';
import ItemSearchContainer from './containers/itemsearchcontainer';
import Cart from './components/cart';
import Page404 from './containers/page404';
import CartProvider from './context/cartContext';
import WishListProvider from './context/wishListContext';
import FirebaseProvider from './context/firebaseContext';
import WishList from './components/wishlist';
import OrderDetailContainer from './containers/orderdetailcontainer';
import LoginContainer from './containers/logincontainer';
import ProfileContainer from './containers/profilecontainer';
import OrdersContainer from './containers/orderscontainer';

function App() { 

  return (
    <FirebaseProvider>
      <CartProvider>
        <WishListProvider>
          <BrowserRouter>
            <header>
              <Navbar/>
            </header>
            <section className="container-fluid">
                <Switch>
                  <Route exact path="/">
                    <ItemListContainer/>
                  </Route>
                  <Route exact path="/categories/:category">
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
                  <Route exact path="/wishlist">
                    <WishList/>
                  </Route>
                  <Route exact path="/profile">
                    <ProfileContainer/>
                  </Route>
                  <Route exact path="/orders">
                    <OrdersContainer/>
                  </Route>
                  <Route exact path="/order/:orderId">
                    <OrderDetailContainer/>
                  </Route>
                  <Route exact path="/login">
                    <LoginContainer/>
                  </Route>
                  <Route path="*" children={<Page404/>} />
                </Switch>
            </section>
            <Footer/>
          </BrowserRouter>
        </WishListProvider>
      </CartProvider>
    </FirebaseProvider>
  );
}

export default App;