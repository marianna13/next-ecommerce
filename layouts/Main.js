import Head from 'next/head';
import Header from '../components/Header';
import { useRouter } from 'next/router';
import { useState } from 'react';

export default ({ children, title = 'freshi.', admin }) => {
  const router = useRouter();
  const pathname = router.pathname;
  const [logged, setLogged] = useState(false);

  return (
    <div className="app-main">
      <Head>
        <title>{ title }</title>
      </Head>

      <Header  logged={logged} setLogged={setLogged}/>

      <main className={(pathname !== '/' ? 'main-page' : '')}>
        { children }
      </main>
    </div>
  )
}