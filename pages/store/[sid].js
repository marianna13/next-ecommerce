import Footer from '../../components/footer';
import Layout from '../../layouts/Main';
import Breadcrumb from '../../components/breadcrumb';
import ProductsFeatured from '../../components/products-featured';
import Gallery from '../../components/product-single/gallery';
import Content from '../../components/store-single/content';
import { server } from '../../utils/server'; 

export async function getServerSideProps({ query }) {

  const sid = query.sid;
  const res = await fetch(`${server}/api/store/${sid}`);
  const store = await res.json();

  return {
    props: {
      store,
    },
  }
}

const Store = ({ store}) => {

  return (
    <Layout>
      <div style={{height:50}}></div>

      <section className="product-single">
        <div className="container">
          <div className="product-single__content">
            <Gallery images={store.images} />
            <Content store={store}/>
          </div>
        </div>
      </section>

      <div className="product-single-page">
        <ProductsFeatured />
      </div>
      <Footer />
    </Layout>
  );
}

export default Store;
