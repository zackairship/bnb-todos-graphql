import React, { useState, Dispatch, SetStateAction, useEffect } from 'react';

type AuthTokenContextProps = {
  jwt: string | null;
  setJwt: Dispatch<SetStateAction<string | null>>;
};

export const AuthTokenContext = React.createContext({} as AuthTokenContextProps);

export const AuthTokenProvider: React.FC = ({ children }) => {
  const [jwt, setJwt] = useState(localStorage.getItem('jwt') || null);

  useEffect(() => {
    if (jwt === null) {
      localStorage.removeItem('jwt');
    } else {
      localStorage.setItem('jwt', jwt)
    }
  }, [jwt]);

  const value: AuthTokenContextProps = {
    jwt,
    setJwt
  };

  return <AuthTokenContext.Provider value={value} children={children} />;
};
