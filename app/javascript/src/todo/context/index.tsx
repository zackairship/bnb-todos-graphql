import React from 'react';
import ApolloClient from 'apollo-boost';
import { ApolloProvider } from '@apollo/react-hooks';

import { UserProvider } from './UserContext';

const AppProviders: React.FC = ({ children }) => {
  const client = new ApolloClient({
    uri: 'http://localhost:3000/graphql',
    headers: {
      'Authorization': 'Bearer abc123'
    }
  });

  return (
    <ApolloProvider client={client}>
      <UserProvider>
        {children}
      </UserProvider>
    </ApolloProvider>
  )
};

export default AppProviders;
