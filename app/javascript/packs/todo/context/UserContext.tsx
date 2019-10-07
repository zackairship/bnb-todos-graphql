import React, { useState, Dispatch, SetStateAction, useEffect } from 'react';

type UserContextProps = {
  user: User | null;
  jwt: string | null;
  setJwt: Dispatch<SetStateAction<string | null>>,
  authenticated: boolean;
};

export const UserContext = React.createContext({} as UserContextProps);

export const UserProvider: React.FC = ({ children }) => {
  const [jwt, setJwt] = useState(localStorage.getItem('jwt'));
  const authenticated = jwt !== null;

  const value: UserContextProps = {
    user: null,
    jwt,
    setJwt,
    authenticated
  };

  useEffect(() => {
    if (jwt === null) {
      localStorage.removeItem('jwt');
    } else {
      localStorage.setItem('jwt', jwt)
    }
  }, [jwt]);

  return <UserContext.Provider value={value} children={children} />;
};
