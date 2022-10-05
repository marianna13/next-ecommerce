import ProductsCarousel from './carousel';
import { useState, useEffect } from 'react';

const ProductsFeatured = () => {
  const [data, setData] = useState(null)
  const [isLoading, setLoading] = useState(false)

  useEffect(() => {
    setLoading(true)
    fetch('http://localhost:3000/api/products')
      .then((res) => res.json())
      .then((data) => {
        setData(data)
        setLoading(false)
      })
  }, [])

  return (
    <section className="section section-products-featured">
      <div className="container">
        <header className="section-products-featured__header">
          <h3>Специально для Вас</h3>
          <a href="/products" className="btn btn--rounded btn--border">Показать все</a>
        </header>

        <ProductsCarousel products={data} />
      </div>
    </section>
  )
};

export default ProductsFeatured