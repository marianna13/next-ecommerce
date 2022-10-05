import Layout from '../layouts/Main';
import Footer from '../components/footer';
import Breadcrumb from '../components/breadcrumb';
import StoresContent from '../components/stores-content';

const Stores = () => (
  <Layout>
    <section className="products-page">
      <div className="container">
        <StoresContent/>
      </div>
    </section>
    <Footer />
  </Layout>
)
  
export default Stores
  