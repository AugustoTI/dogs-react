import React from 'react';
import { USER_POST } from '../../../api';

import { useForm } from '../../../hooks/useForm';
import { useFecth } from '../../../hooks/useFecth';

import { Context } from '../../../contexts/glovalProvider/context';

import { Head } from '../../../components/helper/Head';
import { Button } from '../../../components/form_button/Button';
import { Input } from '../../../components/form_input/Input';
import { Error } from '../../../components/helper/Error';

export const LoginCreate = () => {
  const username = useForm();
  const password = useForm('senha');
  const email = useForm('email');
  const { loading, error, resquest } = useFecth();

  const { userLogin } = React.useContext(Context);

  const handleSubmit = async (event) => {
    event.preventDefault();
    const { url, options } = USER_POST({
      username: username.value,
      password: password.value,
      email: email.value,
    });
    const { response } = await resquest(url, options);
    if (response.ok) {
      userLogin(username.value, password.value);
    }
  };

  return (
    <section className="animeLeft">
      <Head title="Crie sua senha" />
      <h1 className="title">Cadastre-se</h1>
      <form onSubmit={handleSubmit}>
        <Input label="Usuario" type="text" name="username" {...username} />
        <Input label="Senha" type="password" name="password" {...password} />
        <Input label="Email" type="email" name="email" {...email} />
        {loading ? (
          <Button disabled>Cadastrando...</Button>
        ) : (
          <Button>Cadastrar</Button>
        )}
        <Error error={error} />
      </form>
    </section>
  );
};
