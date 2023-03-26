import './category.scss'
import { Link } from 'react-router-dom'
import { STATUS } from '../../redux/status'
import Error from '../error/Error'
import Loader from '../loader/Loader'

const Category = ({categories, status}) => {
    if(status === STATUS.ERROR) return(<Error/>)
    if(status === STATUS.LOADING) return(<Loader/>)
 
  return (
    <section className="categories py-5 bg-gost-white" id='categories'>
        <div className="container">
            <div className="categories-content">
                <div className="section-title">
                    <h3 className="text-uppercase fw-7 text-regal-blue ls-1">
                        category
                    </h3>
                </div>
                <div className="category-items grid">
                    {
                        categories.slice(0,5).map((cat) => (
                            <Link to={`category/${cat.id}`} key={cat.id}>
                                <div className="category-items-img">
                                    <img src={cat.image} alt="" />
                                </div>
                                <div className="category-items-name text-center">
                                    <h6 className="fs-20">{cat.name}</h6>
                                </div>
                            </Link>
                        ))
                    }
                </div>
            </div>
        </div>
    </section>
  )
}

export default Category