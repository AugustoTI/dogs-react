import React from 'react';
import styles from './photoContent.module.css';

import { Link } from 'react-router-dom';

import { Image } from '../../helper/Image';

import { PhotoComments } from '../photoComments/PhotoComments';
import { PhotoDelete } from '../photoDelete/PhotoDelete';

import { Context } from '../../../contexts/glovalProvider/context';

export const PhotoContent = ({ data, single }) => {
  const { photo, comments } = data;
  const user = React.useContext(Context);

  return (
    <div className={`${styles.photo} ${single ? styles.single : ''}`}>
      <div className={styles.img}>
        <Image src={photo.src} alt={photo.title} />
      </div>
      <div className={styles.details}>
        <p className={styles.author}>
          {user.data && user.data.username === photo.author ? (
            <PhotoDelete id={photo.id} />
          ) : (
            <Link to={`/perfil/${photo.author}`}>@{photo.author}</Link>
          )}
          <span className={styles.visualizations}>{photo.acessos}</span>
        </p>
        <h1 className="title">
          <Link to={`/foto/${photo.id}`}>{photo.title}</Link>
        </h1>
        <ul className={styles.attributes}>
          <li>{photo.peso} Kg</li>
          <li>
            {photo.idade > 1 ? `${photo.idade} Anos` : `${photo.idade} Ano`}
          </li>
        </ul>
      </div>
      <PhotoComments single={single} id={photo.id} comments={comments} />
    </div>
  );
};
