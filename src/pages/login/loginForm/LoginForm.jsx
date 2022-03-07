import React from 'react';
import { Link } from 'react-router-dom';
import styles from './loginForm.module.css';
import stylesBtn from '../../../components/form_button/button.module.css';

import { Button } from '../../../components/form_button/Button';
import { Input } from '../../../components/form_input/Input';
import { Error } from '../../../components/helper/Error';

import { Context } from '../../../contexts/glovalProvider/context';

import { useForm } from '../../../hooks/useForm';

export const LoginForm = () => {
  const username = useForm();
  const password = useForm();
  const { userLogin, error, loading } = React.useContext(Context);

  const handleSubmit = async (event) => {
    event.preventDefault();
    if (username.validate() && password.validate()) {
      userLogin(username.value, password.value);
    }
  };

  return (
    <section className="animeLeft">
      <h1 className="title">Login</h1>
      <form className={styles.form} autoComplete="off" onSubmit={handleSubmit}>
        <Input label="Usuario" type="text" name="username" {...username} />
        <Input label="Senha" type="password" name="password" {...password} />
        {loading ? (
          <Button disabled>Carregando...</Button>
        ) : (
          <Button>Entrar</Button>
        )}
        <Error error={error && 'Dados incorretos.'} />
      </form>

      <Link className={styles.perdeu} to="/login/perdeu">
        Perdeu a senha ?
      </Link>

      <div className={styles.cadastro}>
        <h2 className={styles.subtitle}>Cadastra-se</h2>
        <p>Ainda não possui conta ? Cadastra-se no site.</p>
        <Link className={stylesBtn.button} to="/login/criar">
          Cadastro
        </Link>
      </div>
    </section>
  );
};
