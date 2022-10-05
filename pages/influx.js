import Layout from '../layouts/Main';
import { useState, useEffect } from 'react';

const Influx = () => {
  
  const [data, setData] = useState(null)
  const [isLoading, setLoading] = useState(false);
  const [average, setAverage] = useState(0);
  const [max, setMax] = useState(0);
  const [min, setMin] = useState(0);

  useEffect(() => {
    setLoading(true)
    fetch('http://localhost:3000/api/influx')
      .then((res) => res.json())
      .then((data) => {
        setData(data);
        setLoading(false);
        const v = data['message'].map(x => parseInt(x.value));
        const values = data['message'].filter(x => x.value);
        const avg = values.reduce((acc,x) => acc + x.value, 0) / data['message'].length;
        setAverage(avg);
        setMax(Math.max(...v));
        setMin(Math.min(...v));
      })
  }, [])

  if (isLoading) return <p>Loading...</p>

  return (
    <Layout>
      {!data && 
        <div>Loading</div>
      }

      {data &&
        <section className="products-list">
          <ul>
            <li>
            Average: {average.toFixed(2)}
          </li>
          <li>
            Max: {max.toFixed(2)}
          </li>
          <li>
            Min: {min.toFixed(2)}
          </li>
          </ul>
          
        </section>
      }
    </Layout>
  );
    }
  
export default Influx