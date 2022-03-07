import React from 'react';
import { Navigate } from 'react-router-dom';
import { Context } from '../../contexts/glovalProvider/context';

export const ProtectedRoute = ({ children }) => {
  const { login } = React.useContext(Context);

  return login ? children : <Navigate to="/login" />;
};
