import { useState } from 'react';
import List from './list';

const StoresContent = () => {
  const [orderProductsOpen, setOrderProductsOpen] = useState(false);
  
  return (
    <section className="products-content">
      <div className="products-content__intro">
        <h1 style={{marginTop:10}}>Наши магазины</h1>
      </div>

      <List />
    </section>
  );
};
  
export default StoresContent
  