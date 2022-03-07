import React from 'react';
import styles from './photoCommentsForm.module.css';
import { EnviarSVG } from '../../enviarSVG';

import { Error } from '../../helper/Error';

import { useFecth } from '../../../hooks/useFecth';

import { COMMENT_POST } from '../../../api';

export const PhotoCommentsForm = ({ id, setComments, single }) => {
  const [comment, setComment] = React.useState('');
  const { resquest, error } = useFecth();

  const handleSubmit = async (event) => {
    event.preventDefault();
    const { url, options } = COMMENT_POST(id, { comment });
    const { response, json } = await resquest(url, options);
    if (response.ok) {
      setComment('');
      setComments((comments) => [...comments, json]);
    }
  };

  return (
    <form
      className={`${styles.form} ${single ? styles.single : ''}`}
      onSubmit={handleSubmit}
    >
      <textarea
        className={styles.textarea}
        id="comment"
        name="comment"
        placeholder="Escrever comentário..."
        value={comment}
        onChange={({ target }) => setComment(target.value)}
      />
      <button className={styles.button}>
        <EnviarSVG />
      </button>
      <Error error={error} />
    </form>
  );
};
