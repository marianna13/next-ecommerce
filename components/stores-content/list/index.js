import { useState, useEffect } from 'react';
// import fetch from 'isomorphic-unfetch'
import StoreItem from '../../store-item';
import ProductsLoading from './loading';

const StoresContent = () => {
  const [stores, setStores] = useState(null)
  const [isLoading, setLoading] = useState(false)

  useEffect(() => {
    setLoading(true)
    fetch('http://localhost:3000/api/stores')
      .then((res) => res.json())
      .then((data) => {
        setStores(data)
        setLoading(false)
      })
  }, [])

  if (isLoading) return <p>Loading...</p>
  
  return (
    <>
      {!stores && 
        <ProductsLoading />
      }

      {stores &&
        <section className="products-list">
          {stores['message'].map(item => (
            <StoreItem 
              key={item.id}
              id={item.id} 
              storeImage={item.images[0]} 
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

export default StoresContent;