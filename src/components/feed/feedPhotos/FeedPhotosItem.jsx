import React from 'react';
import { Image } from '../../helper/Image';
import styles from './feedPhotosItem.module.css';

export const FeedPhotosItem = ({ photo, setModalPhoto }) => {
  const handleClick = () => setModalPhoto(photo);

  return (
    <li className={styles.photo} onClick={handleClick}>
      <Image src={photo.src} alt={photo.title} />
      <span>{photo.acessos}</span>
    </li>
  );
};
