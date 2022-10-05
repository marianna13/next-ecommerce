import { useState, useEffect } from 'react';
// import fetch from 'isomorphic-unfetch'
import ProductItem from './../../product-item';
import ProductsLoading from './loading';

const ProductsContent = () => {
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

  if (isLoading) return <p>Loading...</p>
  
  return (
    <>
      {!data && 
        <ProductsLoading />
      }

      {data &&
        <section className="products-list">
          {data['message'].map(item => (
            <ProductItem 
              discount={item.discount} 
              key={item.id}
              id={item.id} 
              price={item.price}
              currentPrice={item.discount ? (item.price*item.discount/100).toFixed(2) : item.price}
              productImage={item.images[0]} 
              name={item.name}
            />
          ))}
        </section>
      }
    </>
  );
};

// export async function getServerSideProps() {
//   const res = await fetch("http://localhost:3000/api/products");
//   const json = await res.json();

//   return {
//     props: {
//       data: json,
//     },
//   };
// }

export default ProductsContent