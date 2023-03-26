import './singleCategory.scss'
import { STATUS } from '../../redux/status';
import { formatPrice } from '../../utils/helpers';
import Error from '../error/Error';
import Loader from '../loader/Loader';
import { useDispatch, useSelector } from 'react-redux';
import { setModalData, setModalVisible } from '../../redux/modalSlice';
import SingleProduct from '../singleProduct/SingleProduct';

const SingleCategory = ({ products, status }) => {
    const dispatch = useDispatch();
   const {isModalVisible} = useSelector(state => state.modal);

   const viewModalHandler = (data) => {
      dispatch(setModalData(data));
      dispatch(setModalVisible(true));
   }

   if (status === STATUS.ERROR) return <Error />;
   if (status === STATUS.LOADING) return <Loader />;

   return (
      <section className='cat-single py-5 bg-ghost-white'>
        {isModalVisible && <SingleProduct/>}
         <div className='container'>
            <div className='cat-single-content'>
               <div className='section-title'>
                  <h3 className='text-uppercase fw-7 text-regal-blue ls-1'>
                     {products[0].category.name}
                  </h3>
               </div>
               <div className="product-items grid">
                {
                  products.map((p) => (
                    <div className="product-item bg-white" key={p.id} onClick={() => viewModalHandler(p)}>
                      <div className="product-item-img">
                        <img src={p.images[0]} alt="" />
                        <div className="product-item-cat text-white fs-13 text-uppercase bg-gold fw-6">
                          {p.category.name}
                        </div>
                      </div>
                      <div className="product-item-body">
                        <h6 className="product-item-title text-pine-green fw-4 fs-18">
                          {p.title}
                        </h6>
                        <h6 className="product-item-price text-regal-blue fw-7 fs-18">
                          {formatPrice(p.price)}
                        </h6>
                      </div>
                    </div>
                  ))
                }
               </div>
            </div>
         </div>
      </section>
   );
};

export default SingleCategory;
