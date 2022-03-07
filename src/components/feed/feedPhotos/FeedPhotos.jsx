import React from 'react';
import styles from './feedPhotos.module.css';

import { FeedPhotosItem } from './FeedPhotosItem';

import { useFecth } from '../../../hooks/useFecth';

import { Error } from '../../helper/Error';
import { PHOTOS_GET } from '../../../api';

import { Loading } from '../../helper/Loading';

export const FeedPhotos = ({ setModalPhoto, page, user, setInfinite }) => {
  const { data, loading, error, resquest } = useFecth();

  React.useEffect(() => {
    const fetchPhotos = async () => {
      const total = 6;
      const { url, options } = PHOTOS_GET({ page, total, user });
      const { json, response } = await resquest(url, options);
      if (response && response.ok && json.length < total) {
        setInfinite(false);
      }
    };
    fetchPhotos();
  }, [resquest, user, page, setInfinite]);

  if (error) return <Error error={error} />;
  if (loading) return <Loading />;
  if (!data) return null;

  return (
    <ul className={`${styles.feed} animeLeft`}>
      {data.map((photo) => (
        <FeedPhotosItem
          photo={photo}
          key={photo.id}
          setModalPhoto={setModalPhoto}
        />
      ))}
    </ul>
  );
};
