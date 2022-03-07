import React from 'react';
import styles from './feedModal.module.css';

import { useFecth } from '../../../hooks/useFecth';

import { PHOTO_GET } from '../../../api';

import { Error } from '../../helper/Error';
import { Loading } from '../../helper/Loading';

import { PhotoContent } from '../../photo/photoContent/PhotoContent';

export const FeedModal = ({ photo, setModalPhoto }) => {
  const { data, error, loading, resquest } = useFecth();

  const handleOutsideClick = ({ currentTarget, target }) => {
    if (target === currentTarget) setModalPhoto(null);
  };

  React.useEffect(() => {
    const { url, options } = PHOTO_GET(photo.id);
    resquest(url, options);
  }, [photo, resquest]);

  return (
    <div className={styles.modal} onClick={handleOutsideClick}>
      {error && <Error error={error} />}
      {loading && <Loading />}
      {data && <PhotoContent data={data} />}
    </div>
  );
};
