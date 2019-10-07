import React, { useState, Dispatch, SetStateAction, useEffect, useContext } from 'react';
import gql from 'graphql-tag';
import { useLazyQuery } from '@apollo/react-hooks';
import { AuthTokenContext } from './AuthTokenContext';

type UserContextProps = {
  user: User | null;
  authenticated: boolean;
};

export const UserContext = React.createContext({} as UserContextProps);

const findUser = gql`
  {
    user {
      id
      firstName
      lastName
      email
    }
  }
`;

export const UserProvider: React.FC = ({ children }) => {
  const { jwt } = useContext(AuthTokenContext);

  const [user, setUser] = useState(null);
  const [loadUser, { loading, data, error }] = useLazyQuery(findUser);

  useEffect(() => {
    if (jwt === null) {
      setUser(null);
    } else {
      loadUser();
    }
  }, [jwt]);

  useEffect(() => {
    if (data === undefined) { return; }
    setUser(data.user);
  }, [data])

  const authenticated = user !== null;
  const value: UserContextProps = {
    user,
    authenticated
  };

  return <UserContext.Provider value={value} children={children} />;
};
