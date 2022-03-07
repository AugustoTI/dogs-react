import React from 'react';
import { useNavigate } from 'react-router-dom';

import { Input } from '../../../components/form_input/Input';
import { Button } from '../../../components/form_button/Button';
import { Error } from '../../../components/helper/Error';
import { Head } from '../../../components/helper/Head';

import { useForm } from '../../../hooks/useForm';
import { useFecth } from '../../../hooks/useFecth';

import { PASSWORD_RESET } from '../../../api';

export const LoginPasswordReset = () => {
  const [login, setLogin] = React.useState('');
  const [key, setKey] = React.useState('');
  const password = useForm('senha');
  const { error, loading, resquest } = useFecth();
  const navigate = useNavigate();

  React.useEffect(() => {
    const params = new URLSearchParams(window.location.search);
    const key = params.get('key');
    const login = params.get('login');
    if (key) setKey(key);
    if (login) setLogin(login);
  }, []);

  const handleSubmit = async (event) => {
    event.preventDefault();
    if (password.validate()) {
      const { url, options } = PASSWORD_RESET({
        login,
        key,
        password: password.value,
      });
      const { response } = await resquest(url, options);
      if (response.ok) navigate('/login');
    }
  };

  return (
    <section className="animeLeft">
      <Head title="Resetar senha" />
      <h1 className="title">Resete a senha</h1>
      <form onSubmit={handleSubmit}>
        <Input label="Nova Senha" type="password" name="password" />
        {loading ? (
          <Button disabled>Resetando...</Button>
        ) : (
          <Button>Resetar</Button>
        )}
      </form>
      <Error error={error} />
    </section>
  );
};
