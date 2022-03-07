import React from 'react';
import styles from './userPhotoPost.module.css';

import { useForm } from '../../../hooks/useForm';
import { useFecth } from '../../../hooks/useFecth';

import { Error } from '../../../components/helper/Error';
import { Input } from '../../../components/form_input/Input';
import { Button } from '../../../components/form_button/Button';

import { PHOTO_POST } from '../../../api';
import { useNavigate } from 'react-router-dom';
import { Head } from '../../../components/helper/Head';

export const UserPhotoPost = () => {
  const nome = useForm();
  const peso = useForm('number');
  const idade = useForm('number');
  const [img, setImg] = React.useState({});
  const { data, error, loading, resquest } = useFecth();
  const navigate = useNavigate();

  React.useEffect(() => {
    if (data) navigate('/conta');
  }, [navigate, data]);

  const handleSubtmit = (event) => {
    event.preventDefault();
    const formData = new FormData();
    formData.append('img', img.raw);
    formData.append('nome', nome.value);
    formData.append('peso', peso.value);
    formData.append('idade', idade.value);
    const token = localStorage.getItem('token');
    const { url, options } = PHOTO_POST(formData, token);
    resquest(url, options);
  };

  const handleImgChange = ({ target }) => {
    setImg({
      raw: target.files[0],
      preview: URL.createObjectURL(target.files[0]),
    });
  };

  return (
    <section className={`${styles.photoPost} animeLeft`}>
      <Head title="Poste sua foto" />
      <form onSubmit={handleSubtmit}>
        <Input label="Nome" name="nome" type="text" {...nome} />
        <Input label="Peso" name="peso" type="number" {...peso} />
        <Input label="Idade" name="idade" type="number" {...idade} />
        <input type="file" name="img" id="img" onChange={handleImgChange} />
        {loading ? (
          <Button disabled>Carregando...</Button>
        ) : (
          <Button>Enviar</Button>
        )}
        <Error error={error} />
      </form>
      <div>
        {img.preview && (
          <div
            className={styles.preview}
            style={{ backgroundImage: `url('${img.preview}')` }}
          ></div>
        )}
      </div>
    </section>
  );
};
