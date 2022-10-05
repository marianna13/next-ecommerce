import Link from 'next/link';
import { some } from 'lodash';
import { useDispatch, useSelector } from 'react-redux';
import { toggleFavProduct } from '../../store/actions/userActions';
import { useSession, getSession } from "next-auth/react";

const ProductItem = ({ discount, storeImage, id, name, price, currentPrice }) => {
  const dispatch = useDispatch();


  return (
    <div className="product-item">
      <div className="product__image">
                <Link href={`/store/${id}`}>
          <a>
            <img src={storeImage} alt="product" />
          </a>
        </Link>
      </div>
      
      <div className="product__description">
        <h3>{name}</h3>
      </div>
    </div>
  )
};


export default ProductItem