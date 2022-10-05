import { useSelector } from 'react-redux';
import CheckoutStatus from '../../components/checkout-status';
import Item from './item';

const ShoppingCart = () => {
  const { cartItems } = useSelector(state => state.cart);

  const priceTotal = useSelector(state => {
    const cartItems = state.cart.cartItems;
    let totalPrice = 0;
    if(cartItems.length > 0) {
      cartItems.map(item => totalPrice += item.price * item.count);
    }

    return totalPrice;
  })

  return (
    <section className="cart">
      <div className="container">
        <div className="cart__intro">
          <h3 className="cart__title">Корзина</h3>
          <CheckoutStatus step="cart" />
        </div>

        <div className="cart-list">
          {cartItems.length > 0 &&
            <table>
              <tbody>
                <tr>
                  <th style={{textAlign: 'left'}}>Продукт</th>
                  <th>Количество</th>
                  <th>Цена</th>
                  <th></th>
                </tr>

                {cartItems.map(item => (
                  <Item 
                    key={item.id}
                    id={item.id}
                    thumb={item.thumb}
                    name={item.name}
                    price={item.price.toFixed(2)}
                    count={item.count}
                  />
                ))}
              </tbody>
            </table> 
          } 
          
          {cartItems.length === 0 && 
            <p>В корзине пусто</p>
          }
        </div>
      
        <div className="cart-actions">
          <a href="/products" className="cart__btn-back"><i className="icon-left"></i> Продолжить покупки</a>

          <div className="cart-actions__items-wrapper">
            <p className="cart-actions__total">Всего <strong>${priceTotal.toFixed(2)}</strong></p>
            <a href="/cart/checkout" className="btn btn--rounded btn--yellow">Оформить заказ</a>
          </div>
        </div>
      </div>
    </section>
  )
};

  
export default ShoppingCart