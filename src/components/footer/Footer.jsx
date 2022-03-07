import React from 'react';
import styles from './footer.module.css';
import { DogsFooter } from '../dogs_footer';

export const Footer = () => {
  return (
    <footer className={styles.footer}>
      <DogsFooter />
      <p>Dogs. Alguns direitos reservados</p>
    </footer>
  );
};
