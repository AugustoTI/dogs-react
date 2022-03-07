import React from 'react';
import styles from './photoDelete.module.css';

import { PHOTO_DELETE } from '../../../api';

import { useFecth } from '../../../hooks/useFecth';

export const PhotoDelete = ({ id }) => {
  const { resquest, loading } = useFecth();

  const handleClick = async () => {
    const confirm = window.confirm('Tem certeza que deseja deletar?');
    if (confirm) {
      const { url, options } = PHOTO_DELETE(id);
      const { response } = await resquest(url, options);
      if (response.ok) window.location.reload();
    }
  };

  return (
    <>
      {loading ? (
        <button className={styles.delete} disabled>
          Deletando...
        </button>
      ) : (
        <button onClick={handleClick} className={styles.delete}>
          Deletar
        </button>
      )}
    </>
  );
};
