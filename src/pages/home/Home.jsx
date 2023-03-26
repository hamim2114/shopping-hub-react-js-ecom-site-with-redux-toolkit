import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux'
import Category from '../../components/category/Category';
import ProductList from '../../components/productList/ProductList';
import SingleCategory from '../../components/singleCategory/SingleCategory';
import SingleProduct from '../../components/singleProduct/SingleProduct';
import Slider from '../../components/slider/Slider'
import { getCartTotal } from '../../redux/cartSlice';
import { fetchCategories, fetchProductsByCategory } from '../../redux/categorySlice';
import { fetchProducts } from '../../redux/productSlice';
import './home.scss'

const Home = () => {
  const dispatch = useDispatch();
  const {data: categories, status: categoryStatus} = useSelector(state => state.category);
  const {catProductAll: productsByCategory, catProductAllStatus} = useSelector(state => state.category);
  const {data: products, status: productStatus} = useSelector(state => state.product)

  useEffect(() => {
    dispatch(fetchCategories());
    dispatch(fetchProductsByCategory(1, 'all'));
    dispatch(fetchProductsByCategory(2, 'all'));
    dispatch(fetchProducts());
    dispatch(getCartTotal())
  },[])
  return (
    <div>
      <Slider/>
      <Category categories={categories} status={categoryStatus} />
      {/* <ProductList products = {products} status={productStatus} /> */}
      {/* category one product */}
      <section>
        {
          productsByCategory[0] && <SingleCategory 
          products = {productsByCategory}
          status = {catProductAllStatus}
          />
        }
      </section>
      {/* category two product */}
      <section>
        {
          productsByCategory[1] && <SingleCategory 
          products = {productsByCategory}
          status = {catProductAllStatus}
          />
        }
      </section>
    </div>
  )
}

export default Home