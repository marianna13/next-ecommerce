import ReviewsList from './reviews-list';
import Punctuation from './punctuation';

const Reviews = ({ show, product }) => {
  const style = {
    display: show ? 'flex' : 'none',
  }

  return (
    <section style={style} className="product-single__reviews">
      
      <ReviewsList reviews={product.reviews} />
    </section>
  );
};
  
export default Reviews;
    