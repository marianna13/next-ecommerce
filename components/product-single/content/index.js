import { useState } from 'react';
import productsColors from './../../../utils/data/products-colors';
import productsSizes from './../../../utils/data/products-sizes';
import CheckboxColor from './../../products-filter/form-builder/checkbox-color';
import { useDispatch, useSelector } from 'react-redux';
import { some } from 'lodash';
import { addProduct } from './../../../store/actions/cartActions';
import { toggleFavProduct } from './../../../store/actions/userActions';
import { FiEdit } from "react-icons/fi";
import { useSession, getSession } from "next-auth/react";
import styles from '../../../assets/css/Home.module.scss';




const Content = ({ product }) => {
  const { data: session, status } = useSession();
  const dispatch = useDispatch();

  const logged = status!="unauthenticated";


  const [count, setCount] = useState(1);
  const [color, setColor] = useState('');
  const [itemSize, setItemSize] = useState('');
  const [edit, setEdit] = useState(false);
  const [editColor, setEditColor] = useState('black');
  const [name, setName] = useState('');
  const [price, setPrice] = useState('');
  const [vendor, setVendor] = useState('');
  const [error, setError] = useState('');
  const [message, setMessage] = useState('');
  const [discount, setDiscount] = useState('');
  const [quantityAvailable, setQuantityAvailable] = useState('');
  const [images, setImages] = useState(['']);
  const [category, setCategory] = useState('');

  const onColorSet = (e) => setColor(e);
  const onSelectChange = (e) => setItemSize(e.target.value);

  const { favProducts } = useSelector(state => state.user);
  const isFavourite = some(favProducts, productId => productId === product.id);

  const handleProduct = async (e) => {
        e.preventDefault();

        // reset error and message
        setError('');
        setMessage('');

        // fields check
        if (!name || !price || !vendor) return setError('All fields are required');

        let product = {
            name,
            price,
            vendor,
            published: false,
            createdAt: new Date().toISOString(),
            category,
            quantityAvailable,
            discount,
            images
        };

        let response = await fetch('/api/products', {
            method: 'POST',
            body: JSON.stringify(product),
        });

        let data = await response.json();

        if (data.success) {
            // reset the fields
            setName('');
            setPrice('');
            setVendor('');
            setCategory('');
            setDiscount('');
            setImages(['']);
            setQuantityAvailable('');
            // set the message
            return setMessage(data.message);
        } else {
            // set the error
            return setError(data.message);
        }
    };

  const toggleFav = () => {
    dispatch(toggleFavProduct(
      { 
        id: product.id,
      }
    ))
  }

  const addToCart = () => {
    dispatch(addProduct(
      { 
        id: product.id,
        name: product.name,
        thumb: product.images[0],
        price: product.price*(1-product.discount/100),
        count: count,
        color: color,
        size: itemSize
      }
    ))
  }

  return (
    <section className="product-content">
      <div className="product-content__intro">
        <h5 className="product__id">ID:<br></br>{product.id}</h5>
        {product.discount && <span className="product-on-sale">Акция</span>}
    
         <h2 className="product__name">{product.name}</h2>
          <div className="product__prices">
          
          {product.discount ?
          <div>
          <h4>${( product.price*(1-product.discount/100)).toFixed(2) } <span>${ product.price }</span></h4>
          </div>
          :
          <h4 style={{color:"black"}}>${ product.price }</h4>
          }
          
        </div>
      </div>
      
      <div className="product-content__filters">
        <div className="product-filter-item">
          { !edit  ?
          <div>
          <h5>Количество:</h5>
          <div className="quantity-buttons">
            <div className="quantity-button">
              <button type="button" onClick={() => setCount(count - 1)} className="quantity-button__btn">
                -
              </button>
              <span>{count}</span>
              <button type="button" onClick={() => setCount(count + 1)} className="quantity-button__btn">
                +
              </button>
            </div>
            
            <button type="submit" onClick={() => addToCart()} className="btn btn--rounded btn--yellow">Добавить в корзину</button>
            <button type="button" onClick={toggleFav} className={`btn-heart ${isFavourite ? 'btn-heart--active' : ''}`}><i className="icon-heart"></i></button>
          </div>
          </div> : 
          <form onSubmit={handleProduct} className={styles.form}>
            {error ? (
            <div className={styles.formItem}>
            <h3 className={styles.error}>{error}</h3>
            </div>
            ) : null}
            {message ? (
            <div className={styles.formItem}>
              <h3 className={styles.message}>{message}</h3>
              </div>
              ) : null}
            <div className={styles.formItem}>
              <input
       name="name"
       type="text" 
       onChange={(e) => setName(e.target.value)}
       value={name}
       placeholder={product.name}/> 
            </div>
            <div className={styles.formItem}>
              <input
        name="price"
        type="text" 
        pattern="[0-9]*"
        onChange={(e) => setPrice(e.target.value)}
        value={price}
        placeholder={ product.price }
        />
            </div>
            <div className={styles.formItem}>
              <input
              name="vendor"
              type="text" 
              onChange={(e) => setVendor(e.target.value)}
              value={vendor}
              placeholder={product.vendor}
              />
            </div>
            <div>
              <button type="submit" className='btn btn--rounded btn--yellow'>Редактировать</button>
              </div>
          </form>
           }
          {logged && <button type="button" onClick={() => setEdit(!edit)}>
            <FiEdit 
            className="edit__icon" 
            size="20px"
            color={editColor} 
            style={{margin: '10px', marginTop:'20px'}}
            onMouseOver={() => setEditColor('#FBB03B')}
            onMouseOut={() => setEditColor('black')}/>
            </button>}
        </div>
      </div>
    </section>
  );
};
  
export default Content;
    