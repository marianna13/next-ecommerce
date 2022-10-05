import { useState } from 'react';
import Layout from '../layouts/Main';
import styles from '../assets/css/Home.module.scss';
import Add from '@mui/icons-material/Add';
import { useSession, getSession } from "next-auth/react";

function AddProduct() {
    const { data: session, status } = useSession();

  const [name, setName] = useState('');
    const [price, setPrice] = useState('');
    const [vendor, setVendor] = useState('');
    const [error, setError] = useState('');
    const [message, setMessage] = useState('');
    const [discount, setDiscount] = useState('');
    const [quantityAvailable, setQuantityAvailable] = useState('');
    const [images, setImages] = useState(['']);
    const [category, setCategory] = useState('');
    const [additional, setAdditional] = useState(0);
    const [addArr, setAddArr] = useState([]);
    console.log([...Array(additional).keys()])

    const handleProduct = async (e) => {
        e.preventDefault();

        // reset error and message
        setError('');
        setMessage('');

        // fields check
        if (!name || !price || !vendor) return setError('All fields are required');

        const id = (new Date()).getTime();

        let product = {
            id,
            name,
            price,
            vendor,
            published: false,
            createdAt: new Date().toISOString(),
            category,
            quantityAvailable,
            discount,
            images,
            addArr
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
    if (status === "loading") {
    return (
    <Layout>
      <main className='main-page'>
      <div className='container'>
        <h1>Loading...</h1>
      </div>
      </main>
    </Layout>
    );
  }

  if (status === "unauthenticated") {
    return (
    <Layout>
      <main className='main-page'>
      <div className='container'>
        <h1>Access Denied</h1>
      </div>
      </main>
    </Layout>
    );
  }

    return (
        <Layout>
            <main className='main-page'>
                <div className='container'>
                    <div style={{maxWidth:600}}>
                    <h1 className='header'>Добавьте продукт</h1>
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
                        <h3>Наименование</h3>
                        <input
                            name="name"
                            type="text" 
                            onChange={(e) => setName(e.target.value)}
                            value={name}
                            placeholder="Введите наименование"
                        />
                    </div>
                    <div className={styles.formItem}>
                        <h3>Цена</h3>
                        <input
                            name="price"
                            type="text" 
                            pattern="[0-9]*"
                            onChange={(e) => setPrice(e.target.value)}
                            value={price}
                            placeholder="Введите цену продукта"
                        />
                    </div>
                    <div className={styles.formItem}>
                        <h3>Скидка</h3>
                        <input
                            name="discount"
                            type="text" 
                            pattern="[0-9]*"
                            onChange={(e) => setDiscount(e.target.value)}
                            value={discount}
                            placeholder="Введите скидку на продукт"
                        />
                    </div>
                    <div className={styles.formItem}>
                        <h3>Количество</h3>
                        <input
                            name="quantityAvailable"
                            type="text" 
                            pattern="[0-9]*"
                            onChange={(e) => setQuantityAvailable(e.target.value)}
                            value={quantityAvailable}
                            placeholder="Количество"
                        />
                    </div>
                    <div className={styles.formItem}>
                        <h3>Категория</h3>
                        <select
                        value={category} 
                        onChange={(e) => setCategory(e.target.value)} >
                            <option value="Фрукты">Фрукты</option>
                            <option value="Овощи">Овощи</option>
                            <option value="Орехи">Орехи</option>
                        </select>
                    </div>
                    <div className={styles.formItem}>
                        <h3>Изображение</h3>
                        <input
                            name="images"
                            type="text" 
                            onChange={(e) => setImages([e.target.value])}
                            value={images}
                            placeholder="Введите URL изображения"
                        />
                    </div>
                    <div className={styles.formItem}>
                        <h3>Поставщик</h3>
                        <input
                            name="vendor"
                            type="text" 
                            onChange={(e) => setVendor(e.target.value)}
                            value={vendor}
                            placeholder="Введите имя поставщика"
                        />
                    </div>
                      <div>
                        {Array.from(Array(additional)).map((i) =>{
                           return ( <div className={styles.formItem}>
                        <h3>Дополнительное поле</h3>
                        <input
                            name="additional"
                            type="text" 
                            onChange={(e) => setAddArr([...addArr, e.target.value])}
                            value={addArr[i]}
                            placeholder="Введите дополнительное поле"
                        />
                    </div>)
                        }
                        ) }
                    </div>
                    
                     <div>
                        <button className='btn btn--rounded btn--yellow' onClick={()=> setAdditional(additional+1)}><Add/></button>
                    </div>
                    <div>
                        <button type="submit" className='btn btn--rounded btn--yellow' style={{margin:10}}>Добавить продукт</button>
                    </div>
                </form>
                </div>
            </div>
            </main>
        </Layout>
    );
}

export default AddProduct