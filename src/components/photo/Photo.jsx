import React from 'react';
import { useParams } from 'react-router-dom';
import { PHOTO_ID } from '../../api';
import { useFecth } from '../../hooks/useFecth';
import { Error } from '../helper/Error';
import { Head } from '../helper/Head';
import { Loading } from '../helper/Loading';
import { PhotoContent } from './photoContent/PhotoContent';

export const Photo = () => {
  const { id } = useParams();
  const { data, error, loading, resquest } = useFecth();

  React.useEffect(() => {
    const { url } = PHOTO_ID(id);
    resquest(url);
  }, [id, resquest]);

  if (error) return <Error error={error} />;
  if (loading) return <Loading />;
  if (data)
    return (
      <section className="container mainContainer">
        <Head title={data.photo.title} />
        <PhotoContent single={true} data={data} />
      </section>
    );
  else return null;
};
