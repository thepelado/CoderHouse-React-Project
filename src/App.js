import './App.css';
import Navbar from './components/navbar';
import ItemListContainer from './components/itemlistcontainer';
//import 'bootstrap/dist/css/bootstrap.min.css';

function App() {
  return (
    <div className="App">
      <header>
        <Navbar/>
      </header>
      <section class="container-fluid">
        <div className="col-12 list-items">
          <div className="row">
            <ItemListContainer/>
          </div>
        </div>
      </section>
    </div>
  );
}

export default App;