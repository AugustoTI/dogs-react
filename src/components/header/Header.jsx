import React from 'react';
import styles from './header.module.css';

import { Link } from 'react-router-dom';
import { Dogs } from '../dogs_logo/Dogs';

import { Context } from '../../contexts/glovalProvider/context';

export const Header = () => {
  const { data } = React.useContext(Context);

  return (
    <header className={styles.header}>
      <nav className={`container ${styles.nav}`}>
        <Link to="/" className={styles.logo} aria-label="Dogs - Home">
          <Dogs />
        </Link>

        {data ? (
          <Link to="/conta" className={styles.login}>
            {data.username}
          </Link>
        ) : (
          <Link to="/login" className={styles.login}>
            Login / Criar
          </Link>
        )}
      </nav>
    </header>
  );
};
