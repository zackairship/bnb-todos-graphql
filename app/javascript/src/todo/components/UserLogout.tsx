import React, { useContext } from 'react';
import { Redirect } from 'react-router-dom';
import { AuthTokenContext } from '../context/AuthTokenContext';

const UserLogout: React.FC = () => {
  const { setJwt } = useContext(AuthTokenContext);
  setJwt(null);

  return <Redirect to="/" />;
};

export default UserLogout;
