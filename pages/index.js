import Layout from '../layouts/Main';
import PageIntro from '../components/page-intro';
import ProductsFeatured from '../components/products-featured';
import Footer from '../components/footer';
import Subscribe from '../components/subscribe';
const IndexPage = () => {
  return (
    <Layout>
      <PageIntro />

      <section className="featured">
        <div className="container">
          <article style={{backgroundImage: 'url(https://images.unsplash.com/photo-1425934398893-310a009a77f9?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1171&q=80)'}} className="featured-item featured-item-large">
            <div className="featured-item__content">
              <h3>Сезон голубики</h3>
              <a href="#" className="btn btn--rounded">Посмотреть</a>
            </div>
          </article>
          
          <article style={{backgroundImage: 'url(https://images.unsplash.com/photo-1505252585461-04db1eb84625?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=408&q=80)'}} className="featured-item featured-item-small-first">
            <div className="featured-item__content">
              <h3>Фруктовые коктейли</h3>
              <a href="#" className="btn btn--rounded">Посмотреть</a>
            </div>
          </article>
          
          <article style={{backgroundImage: 'url(https://images.unsplash.com/photo-1590779033100-9f60a05a013d?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=387&q=80)'}} className="featured-item featured-item-small">
            <div className="featured-item__content">
              <h3>Скидки для Вас</h3>
              <a href="#" className="btn btn--rounded">Посмотреть</a>
            </div>
          </article>
        </div>
      </section>
       

      <ProductsFeatured />
      <Subscribe />
      <Footer />
    </Layout>

    
    
  )
}


export default IndexPage