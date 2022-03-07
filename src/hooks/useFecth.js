import React from 'react';

export const useFecth = () => {
  const [data, setData] = React.useState(null);
  const [error, setError] = React.useState(null);
  const [loading, setLoandig] = React.useState(false);

  const resquest = React.useCallback(async (url, options) => {
    let response;
    let json;
    try {
      setError(null);
      setLoandig(true);
      response = await fetch(url, options);
      json = await response.json();
      if (!response.ok) throw new Error(json.message);
    } catch (err) {
      json = null;
      setError(err.message);
    } finally {
      setData(json);
      setLoandig(false);
      return { json, response };
    }
  }, []);

  return { data, loading, error, resquest };
};
