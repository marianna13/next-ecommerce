import Layout from '../layouts/Main';
import Link from 'next/link';
import { useForm } from "react-hook-form";
import { server } from '../utils/server'; 
import { postData } from '../utils/services'; 
import { useSession, signIn, signOut } from "next-auth/react";
import { GoMarkGithub } from "react-icons/go";

const LoginPage = () => {
  const { register, handleSubmit, errors } = useForm();

  const { data: session, status } = useSession();


  const onSubmit = async data => {
    const res = await postData(`${server}/api/login`, {
      email: data.email,
      password: data.password
    });
    if (res.status) {
    }
  };

  return (
    <Layout>
      <section className="form-page">
        <div className="container">
          <div className="back-button-section">
            <Link href="/products">
              <a><i className="icon-left"></i> Вернуться к магазину</a>
            </Link>
          </div>

          {!session ? <div className="form-block">
           <h1>Войти</h1>
            
            <form className="form" onSubmit={handleSubmit(onSubmit)}>
              <div className="form__input-row">
                <input 
                  className="form__input" 
                  placeholder="email" 
                  type="text" 
                  name="email"
                  ref={register({
                    required: true,
                    pattern: /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/,
                  })}
                />

                {errors.email && errors.email.type === 'required' && 
                  <p className="message message--error">Обязательное поле</p>
                }

                {errors.email && errors.email.type === 'pattern' && 
                  <p className="message message--error">Введите действительный email</p>
                }
              </div>
              
              <div className="form__input-row">
                <input 
                  className="form__input" 
                  type="password" 
                  placeholder="пароль" 
                  name="password"
                  ref={register({ required: true })}
                />
                {errors.password && errors.password.type === 'required' && 
                  <p className="message message--error">Обязательное поле</p>
                }
              </div>

              <div className="form__info">
                <div className="checkbox-wrapper">
                  <label htmlFor="check-signed-in" className={`checkbox checkbox--sm`}>
                    <input 
                      type="checkbox" 
                      name="keepSigned" 
                      id="check-signed-in" 
                      ref={register({ required: false })}
                    />
                    <span className="checkbox__check"></span>
                    <p>Запомните меня</p>
                  </label>
                </div>
                <a href="/forgot-password" className="form__info__forgot-password">Забыли пароль?</a>
              </div>

              <div className="form__btns">
                <button type="button" className="btn-social fb-btn" onClick={() => signIn("github")}><GoMarkGithub style={{margin:10}}/>Github</button>
                <button type="button" className="btn-social google-btn"><img src="/images/icons/gmail.svg" alt="gmail" /> Gmail</button>
              </div>

              <button type="submit" className="btn btn--rounded btn--yellow btn-submit">Войти</button>

              <p className="form__signup-link">Нет аккаунта? <a href="/register">Зарегестрироваться</a></p>
            </form>
          </div>
          :
          <div>
            <button onClick={signOut}>Выйти</button> <br />
            </div>}

        </div>
      </section>
    </Layout>
  )
}

  
export default LoginPage
  