import React from 'react';
import { Context } from './context';

import { useNavigate } from 'react-router-dom';

import { TOKEN_POST, TOKEN_VALIDATE_POST, USER_GET } from '../../api';

export const GlobalProvider = ({ children }) => {
  const [data, setData] = React.useState(null);
  const [login, setLogin] = React.useState(null);
  const [loading, setLoading] = React.useState(null);
  const [error, setError] = React.useState(null);
  const navigate = useNavigate();

  const getUser = async (token) => {
    const { url, options } = USER_GET(token);
    const res = await fetch(url, options);
    const resJSON = await res.json();
    setData(resJSON);
    setLogin(true);
  };

  const userLogin = async (username, password) => {
    try {
      setError(null);
      setLoading(true);
      const { url, options } = TOKEN_POST({ username, password });
      const tokenRes = await fetch(url, options);

      if (!tokenRes.ok) throw new Error(`Error: ${tokenRes.statusText}`);
      const { token } = await tokenRes.json();
      localStorage.setItem('token', token);
      await getUser(token);
      navigate('/conta');
    } catch (err) {
      setError(err.message);
      setLogin(false);
    } finally {
      setLoading(false);
    }
  };

  const userLogout = React.useCallback(async () => {
    setData(null);
    setError(null);
    setLoading(false);
    setLogin(false);
    localStorage.removeItem('token');
    navigate('/login');
  }, [navigate]);

  React.useEffect(() => {
    const autoLogin = async () => {
      const token = localStorage.getItem('token');
      if (token) {
        try {
          setError(null);
          setLoading(true);
          const { url, options } = TOKEN_VALIDATE_POST(token);
          const res = await fetch(url, options);
          if (!res.ok) throw new Error('Token Inválido');
          await getUser(token);
        } catch (err) {
          userLogout();
        } finally {
          setLoading(false);
        }
      } else {
        setLogin(false);
      }
    };
    autoLogin();
  }, [userLogout]);

  return (
    <Context.Provider
      value={{ userLogin, userLogout, data, error, loading, login }}
    >
      {children}
    </Context.Provider>
  );
};
