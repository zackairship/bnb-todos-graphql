import React from 'react';

import { AuthTokenProvider } from './AuthTokenContext';
import { UserProvider } from './UserContext';
import ApolloContext from './ApolloContext';

const AppProviders: React.FC = ({ children }) => {
  return (
    <AuthTokenProvider>
      <ApolloContext>
        <UserProvider>
          {children}
        </UserProvider>
      </ApolloContext>
    </AuthTokenProvider>
  )
};

export default AppProviders;
