import React from 'react';
import { Row } from 'antd';

import { UserContext } from '../context/UserContext';

const Home: React.FC = () => {
  const { authenticated, user } = React.useContext(UserContext);

  return (
    <Row>
      <h1>TodoApp!</h1>
      {authenticated && <p>{user.firstName} {user.lastName}</p>}
    </Row>
  )
};

export default Home;
