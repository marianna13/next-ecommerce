import Link from 'next/link';
import { some } from 'lodash';
import { useDispatch, useSelector } from 'react-redux';
import { toggleFavProduct } from './../../store/actions/userActions';
import { useSession, getSession } from "next-auth/react";

const ProductItem = ({ discount, productImage, id, name, price, currentPrice }) => {
  const dispatch = useDispatch();

  const { favProducts } = useSelector(state => state.user);

  const isFavourite = some(favProducts, productId => productId === id);

  const toggleFav = () => {
    dispatch(toggleFavProduct(
      { 
        id,
      }
    ))
  }

  return (
    <div className="product-item">
      <div className="product__image">
        <button type="button" onClick={toggleFav} className={`btn-heart ${isFavourite ? 'btn-heart--active' : ''}`}><i className="icon-heart"></i></button>

        <Link href={`/product/${id}`}>
          <a>
            <img src={productImage} alt="product" />
            {discount && 
              <span className="product__discount">{discount}%</span>
            }
          </a>
        </Link>
      </div>
      
      <div className="product__description">
        <h3>{name}</h3>
        <div className={"product__price " + (discount ? 'product__price--discount' : '')} >
          {discount &&  <h4>${(price*(1-discount/100)).toFixed(2) }</h4>}
          {!discount &&  <h4>${price }</h4>}
          {discount &&  
            <span>${ price }</span>
          }
        </div>
      </div>
    </div>
  )
};


export default ProductItem