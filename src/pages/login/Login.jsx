import React from 'react';
import styles from './login.module.css';
import { Navigate, Route, Routes } from 'react-router-dom';

import { LoginForm } from './loginForm/LoginForm';
import { LoginCreate } from './loginCreate/LoginCreate';
import { LoginPasswordLost } from './loginPasswordLost/LoginPasswordLost';
import { LoginPasswordReset } from './loginPassowordReset/LoginPasswordReset';

import { Context } from '../../contexts/glovalProvider/context';
import { Error404 } from '../../components/Error404/Error404';

import { Head } from '../../components/helper/Head';

export const Login = () => {
  const { login } = React.useContext(Context);
  if (login) return <Navigate to="/conta" />;

  return (
    <section className={styles.login}>
      <div className={styles.forms}>
        <Head title="Login" />
        <Routes>
          <Route path="/" element={<LoginForm />} />
          <Route path="criar" element={<LoginCreate />} />
          <Route path="perdeu" element={<LoginPasswordLost />} />
          <Route path="resetar" element={<LoginPasswordReset />} />
          <Route path="*" element={<Error404 />} />
        </Routes>
      </div>
    </section>
  );
};
