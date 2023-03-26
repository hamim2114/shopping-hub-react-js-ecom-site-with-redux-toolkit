import { Link } from 'react-router-dom';
import './cartPage.scss';
import { FaChevronRight, FaHome, FaMinus, FaPlus, FaTrash } from 'react-icons/fa';
import { useDispatch, useSelector } from 'react-redux';
import { useEffect } from 'react';
import { clearCart, getCartTotal, removeFromCart, toggleCartQty } from '../../redux/cartSlice';
import { formatPrice } from '../../utils/helpers';

const CartPage = () => {
   const dispatch = useDispatch();
   const {
      data: cartProducts,
      totalItems,
      totalAmount,
      deleveryCharge,
   } = useSelector((state) => state.cart);

   useEffect(() => {
      dispatch(getCartTotal());
   }, [useSelector((state) => state.cart)]);

   const emptyCartMsg = <h4 className="text-red fw-6">No Items Found!</h4>

   return (
      <div className='cart-page'>
         <div className='container'>
            <div className='breadcrumb'>
               <ul className='breadcrumb-items flex'>
                  <li className='breadcrumb-item'>
                     <Link to='/'>
                        <FaHome />
                        <span className='breadcrumb-separator'>
                           <FaChevronRight />
                        </span>
                     </Link>
                  </li>
                  <li>cart</li>
               </ul>
            </div>
         </div>
         <div className='bg-ghost-white py-5'>
            <div className='container'>
               <div className='section-title bg-ghost-white'>
                  <h3 className='text-uppercase fw-7 text-regal-blue ls-1'>
                     My Cart
                  </h3>
               </div>
               {
                cartProducts.length === 0 ? emptyCartMsg : (
                  <div className="cart-content grid">
                    <div className="cart-left">
                      <div className="cart-items grid">
                        {
                          cartProducts.map((item) => (
                            <div className="cart-item grid" key={item.id}>
                              <div className="cart-item-img flex flex-column bg-white">
                                <img src={item.images[0]} alt="" />
                                <button className="btn-square rmv-from-cart-btn">
                                  <span className="btn-square-icon" onClick={() => dispatch(removeFromCart({id:item.id}))}><FaTrash/></span>
                                </button>
                              </div>

                              <div className="cart-item-info">

                                <h6 className="fs-16 fw-5 text-light-blue">{item.title}</h6>

                                <div className="qty flex">
                                  <span className="text-light-blue qty-text">Qty:</span>
                                  <div className="qty-change flex">
                                    <button className="qty-dec fs-14 text-light-blue" onClick={() => dispatch(toggleCartQty({id:item.id, type:'DEC'}))} ><FaMinus/></button>
                                    <span className="qty-value flex flex-center">{item.quantity}</span>
                                    <button className="qty-inc fs-14 text-light-blue" onClick={() => dispatch(toggleCartQty({id:item.id, type:'INC'}))}><FaPlus/></button>
                                  </div>
                                </div>

                                <div className="flex flex-between">
                                  <div className="text-pine-green fw-4 fs-15 price">
                                    Price: {formatPrice(item.price)}
                                  </div>
                                  <div className="sub-total fw-6 fs-18 text-regal-blue">
                                    <span>Sub Total: </span>
                                    <span>{formatPrice(item.totalPrice)}</span>
                                  </div>
                                </div>
                                
                              </div>
                            </div>
                          ))
                        }
                      </div>
                      <button className="btn-danger" onClick={() => dispatch(clearCart())}>
                        <span className="fs-16">Clear all</span>
                      </button>
                    </div>

                    <div className="cart-right bg-white">
                      <div className="cart-summary text-light-blue">
                        <div className="cart-summary-title">
                          <h6 className="fs-20 fw-5">Order Summery</h6>
                        </div>

                        <ul className="cart-summary-info">
                          <li className="flex flex-between">
                            <span className="fw4">Selected {totalItems} items(s) Price</span>
                            <span className="fw-7">Price: {formatPrice(totalAmount)}</span>
                          </li>
                          <li className="flex flex-between">
                            <span className="fw-4">Discount</span>
                            <span className="fw-7">
                              <span className="fw-5 text-gold">-&nbsp;</span>
                              {formatPrice(0)}</span>
                          </li>
                          <li className="flex flex-between">
                            <span className="fw-4">Delevery Cost</span>
                            <span className="fw-7">
                              <span className="fw-5 text-gold">+&nbsp;</span>
                              <span>{formatPrice(deleveryCharge)}</span>
                            </span>
                          </li>
                        </ul>

                        <div className="cart-summary-total flex flex-between fs-18">
                          <span className="fw-6">Grand Total:</span>
                          <span className="fw-6">{formatPrice(totalAmount + deleveryCharge)}</span>
                        </div>
                        <div className="cart-summary-btn">
                          <button className="btn-secondary">Proceed to Checkout</button>
                        </div>

                      </div>
                    </div>
                  </div>
                )
               }
            </div>
         </div>
      </div>
   );
};

export default CartPage;
