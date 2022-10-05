import { useState } from 'react';
import Layout from '../layouts/Main';
import styles from '../assets/css/Home.module.scss';
import { useSession, getSession } from "next-auth/react";
import validator from 'validator';

function AddProduct() {
    const { data: session, status } = useSession();

  const [name, setName] = useState('');
    const [error, setError] = useState('');
    const [message, setMessage] = useState('');
    const [email, setEmail] = useState('');
    const [emailError, setEmailError] = useState('');
    const [phone, setPhone] = useState('');
    const [address, setAddress] = useState('');
    const [logo, setLogo] = useState('');

    const handleProduct = async (e) => {
        e.preventDefault();

        // reset error and message
        setError('');
        setMessage('');

        // fields check
        if (!name || !address || !logo) return setError('Имя, адрес и логотип обязательны!');

        const id = (new Date()).getTime().toString();

        let vendor = {
            id,
            name,
            email,
            phone,
            address,
            createdAt: new Date().toISOString(),
            logo
        };

        let response = await fetch('/api/vendors', {
            method: 'POST',
            body: JSON.stringify(vendor),
        });

        let data = await response.json();

        if (data.success) {
            // reset the fields
            setName('');
            setLogo('');
            setEmail('');
            setAddress('');
            setPhone('');
            // set the message
            return setMessage('Поставщик добавлен!');
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

  const validateEmail = (e) => {
    var email = e.target.value;
  
    if (validator.isEmail(email)) {
      setEmail(email);
      setEmailError(null);
    } else {
        setEmail(email);
      setEmailError('Введите действительный email!');
    }
  }

    return (
        <Layout>
            <main className='main-page'>
                <div className='container'>
                    <div style={{maxWidth:600}}>
                    <h1 className='header'>Добавьте поставщика</h1>
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
                        <h3>Имя постащика</h3>
                        <input
                            name="name"
                            type="text" 
                            onChange={(e) => setName(e.target.value)}
                            value={name}
                            placeholder="Введите имя постащика"
                        />
                    </div>
                    <div className={styles.formItem}>
                        <h3>Адрес</h3>
                        <input
                            name="address"
                            type="text" 
                            onChange={(e) => setAddress(e.target.value)}
                            value={address}
                            placeholder="Введите адрес постащика"
                        />
                    </div>
                    <div className={styles.formItem}>
                        <h3>Электронная почта постащика </h3>
                        <input
                            name="email"
                            type="text" 
                            onChange={(e) => validateEmail(e)}
                            value={email}
                            placeholder="Введите email постащика"
                        />
                        <span style={{
                            fontWeight: 'bold',
                            color: 'red',
                            }}>{emailError}</span>
                    </div>
                    <div className={styles.formItem}>
                        <h3>Номер телефона постащика</h3>
                        <input
                            name="phone"
                            type="text" 
                            onChange={(e) => setPhone(e.target.value)}
                            value={phone}
                            placeholder="Введите номер телефона постащика"
                        />
                    </div>
                    <div className={styles.formItem}>
                        <h3>Логотип</h3>
                        <input
                            name="logo"
                            type="text" 
                            onChange={(e) => setLogo(e.target.value)}
                            value={logo}
                            placeholder="Введите URL логотипа постащика"
                        />
                    </div>
                    <div>
                        <button type="submit" className='btn btn--rounded btn--yellow'>Добавить постащика</button>
                    </div>
                </form>
                <div style={{marginTop:30}}></div>
                </div>
            </div>
            </main>
        </Layout>
    );
}

export default AddProduct