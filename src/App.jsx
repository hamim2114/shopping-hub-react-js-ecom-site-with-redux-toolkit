import { Provider } from 'react-redux';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import './App.scss';
import Footer from './components/footer/Footer';
import Navbar from './components/navbar/Navbar';
import CartPage from './pages/cartPage/CartPage';
import Category from './pages/categoryPage/CategoryPage';
import Home from './pages/home/Home';
import store from './redux/store';

function App() {
   return (
      <div className='App'>
         <Provider store={store}>
            <BrowserRouter>
               <Navbar />
               <Routes>
                  <Route path='/' element={<Home />} />
                  <Route path='/category/:id' element={<Category />} />
                  <Route path='/cart' element={<CartPage />} />
               </Routes>
               <Footer />
            </BrowserRouter>
         </Provider>
      </div>
   );
}

export default App;
