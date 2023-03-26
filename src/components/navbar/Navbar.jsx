import './navbar.scss'
import { Link } from 'react-router-dom';
import { FaBars, FaSearch, FaShoppingCart, FaTimes } from 'react-icons/fa';
import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { fetchCategories } from '../../redux/categorySlice';

const Navbar = () => {
  const dispatch = useDispatch();
  const {data: categories} = useSelector(state => state.category);
  const {totalItems} = useSelector(state => state.cart);
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  useEffect(() => {
    dispatch(fetchCategories())
  },[])

   return (
      <nav className='navbar'>
         <div className='navbar-content'>
            <div className='container'>
            <div className = "navbar-top flex flex-between">
              <Link to = "/" className = "navbar-brand">
                <span className = "text-regal-blue">Shopping</span><span className='text-gold'>Hub.</span>
              </Link>

              <form className = "navbar-search flex">
                <input type = "text" placeholder='Search here ...' />
                <button type = "submit" className = "navbar-search-btn">
                  <FaSearch/>
                </button>
              </form>

              <div className = "navbar-btns">
                <Link to = "/cart" className="add-to-cart-btn flex">
                  <span className = "btn-ico">
                    <FaShoppingCart/>
                  </span>
                  <div className='btn-txt fw-5'>Cart
                    <span className='cart-count-value'>{totalItems}</span>
                  </div>
                </Link>
              </div>
          </div>
            </div>

            <div className='navbar-bottom bg-regal-blue'>
          <div className='container flex flex-between'>
            <ul className = {`nav-links flex ${isSidebarOpen ? 'show-nav-links' : ""}`}>
              <button type = "button" className='navbar-hide-btn text-white' onClick={() => setIsSidebarOpen(false)}>
                <FaTimes/>
              </button>
              {
                categories.map((cat, i) => (
                  <li key={i}><Link to = {`category/${cat.id}`} className = "nav-link text-white" >{cat.name}</Link></li>
                ))
              }
            </ul>
            <button type = "button" className='navbar-show-btn text-gold' onClick={() => setIsSidebarOpen(true)}>
              <FaBars/>
            </button>
          </div>
        </div>
         </div>
      </nav>
   );
};

export default Navbar;
