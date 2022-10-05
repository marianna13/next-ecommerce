import { Swiper, SwiperSlide } from 'swiper/react';
import SwiperCore, {EffectFade, Navigation} from 'swiper';
import Link from 'next/link';

SwiperCore.use([EffectFade, Navigation]);

const PageIntro = () => {

  return (
    <section className="page-intro">  
      <Swiper navigation effect="fade" className="swiper-wrapper">
        <SwiperSlide>
          <div className="page-intro__slide" style={{ backgroundImage: "url('https://images.unsplash.com/photo-1581515286348-98549702050f?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1171&q=80')" }}>
            <div className="container">
              <div className="page-intro__slide__content">
                <h2>Свежие продукты прямо домой</h2>
                <Link href="/products">
                  <a className="btn-shop"><i className="icon-right"></i>Заказать</a>
                  </Link>
              </div>
            </div>
          </div>
        </SwiperSlide>

        <SwiperSlide>
          <div className="page-intro__slide" style={{ backgroundImage: "url('https://images.unsplash.com/photo-1488459716781-31db52582fe9?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1170&q=80')" }}>
            <div className="container">
              <div className="page-intro__slide__content">
                <h2>Витамины на каждый день</h2>
                <Link href="/products">
                  <a className="btn-shop"><i className="icon-right"></i>Заказать</a>
                  </Link>
              </div>
            </div>
          </div>
        </SwiperSlide>
      </Swiper>

      <div className="shop-data">
        <div className="container">
          <ul className="shop-data__items">
            <li>
              <i className="icon-shipping"></i>
              <div className="data-item__content">
                <h4>Бесплатная доставка</h4>
                <p>Для заказов от 1000</p>
              </div>
            </li>
            
            <li>
              <i className="icon-shipping"></i>
              <div className="data-item__content">
                <h4>99% Довольных покупателей</h4>
                <p>Наши клиенты довольны нами</p>
              </div>
            </li>
            
            <li>
              <i className="icon-cash"></i>
              <div className="data-item__content">
                <h4>Качество гарантировано</h4>
                <p>Все свежже или мы вернем деньги</p>
              </div>
            </li>
          </ul>
        </div>
      </div>
    </section>
  )
};

export default PageIntro