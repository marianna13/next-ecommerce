const Subscribe = () => {
  return (
    <section className="subscribe">
      <div className="container">
        <div style={{backgroundImage: 'url(https://images.unsplash.com/photo-1570913196376-dacb677ef459?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1170&q=80)'}} className="subscribe__content">
          <h4>Подпишитесь на нашу рассылку</h4>

          <form className="subscribe__form">
            <input type="email" placeholder="Электронная почта" />
            <button type="submit" className="btn btn--rounded btn--yellow">Подписаться</button>
          </form>
        </div>
      </div>
    </section>
  )
};


export default Subscribe