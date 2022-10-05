import ProductItem from './../../product-item';

// import Swiper core and required components
import { Swiper, SwiperSlide } from 'swiper/react';

let slidesPerView = 1.3;
let centeredSlides = true;
let spaceBetween = 30;
if (process.browser) {
  if(window.innerWidth > 768) {
    slidesPerView = 3;
    spaceBetween = 35;
    centeredSlides = false;
  }
  if(window.innerWidth > 1024) {
    slidesPerView = 4;
    spaceBetween = 65;
    centeredSlides = false;
  }
}

const ProductsCarousel = ({ products }) => {
  console.log(products)
  if (!products) return 'Loading';
  

  return (
    <div className="products-carousel">
      <Swiper 
      spaceBetween={spaceBetween} 
      loop={true} 
      centeredSlides={centeredSlides} 
      watchOverflow={true} 
      slidesPerView={slidesPerView} 
      className="swiper-wrapper">
        {products['message'].map(item => (
          <SwiperSlide key={item.id}>
            <ProductItem 
              discount={item.discount ? item.discount : 0}
              price={item.price}
              currentPrice={item.discount ? (item.price*item.discount/100).toFixed(2) : item.price}
              key={item.id}
              id={item.id} 
              productImage={item.images[0]} 
              name={item.name}
            />
          </SwiperSlide>
        ))}
      </Swiper>
    </div>
  )
}

export default ProductsCarousel