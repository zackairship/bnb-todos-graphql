import React, { useContext } from 'react';
import ApolloClient from 'apollo-boost';
import { ApolloProvider } from '@apollo/react-hooks';
import { AuthTokenContext } from './AuthTokenContext';

const ApolloContext: React.FC = ({ children }) => {
  const { jwt } = useContext(AuthTokenContext);

  const client = new ApolloClient({
    uri: 'http://localhost:3000/graphql',
    headers: {
      'Authorization': `Bearer ${jwt}`
    }
  });
  return (
    <ApolloProvider client={client}>
      {children}
    </ApolloProvider>
  );
}

export default ApolloContext;
