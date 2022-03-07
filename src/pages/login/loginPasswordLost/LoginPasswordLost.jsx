import React from 'react';

import { Input } from '../../../components/form_input/Input';
import { Button } from '../../../components/form_button/Button';

import { useForm } from '../../../hooks/useForm';
import { useFecth } from '../../../hooks/useFecth';

import { PASSWORD_LOST } from '../../../api';

import { Error } from '../../../components/helper/Error';
import { Head } from '../../../components/helper/Head';

export const LoginPasswordLost = () => {
  const login = useForm();
  const { data, loading, error, resquest } = useFecth();

  const handleSubmit = (event) => {
    event.preventDefault();

    if (login.validate()) {
      const { url, options } = PASSWORD_LOST({
        login: login.value,
        url: window.location.href.replace('perdeu', 'resetar'),
      });
      resquest(url, options);
    }
  };

  return (
    <section className="animeLeft">
      <Head title="Perdeu a senha ?" />
      <h1 className="title">Perdeu a senha ?</h1>
      {data ? (
        <p style={{ color: '#4c1' }}>{data}</p>
      ) : (
        <form onSubmit={handleSubmit}>
          <Input label="Email / Usuario" type="text" name="login" {...login} />
          {loading ? (
            <Button disabled>Enviando...</Button>
          ) : (
            <Button>Enviar email</Button>
          )}
        </form>
      )}

      <Error error={error} />
    </section>
  );
};
