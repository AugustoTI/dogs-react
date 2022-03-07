import React from 'react';
import styles from './loading.module.css';
import { LoadingSVG } from '../carregandoSVG';

export const Loading = () => {
  return (
    <div className={styles.wrapper}>
      <div className={styles.loading}>
        <LoadingSVG />
      </div>
    </div>
  );
};
