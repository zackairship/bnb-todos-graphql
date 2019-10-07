import React from 'react';
import { useHistory, Link } from 'react-router-dom';
import { Menu } from 'antd';
import { MenuProps } from 'antd/es/menu';

import { UserContext } from '../context/UserContext';

const AuthenticatedMenu: React.FC<MenuProps> = (props) => {
  return (
    <Menu {...props}>
      <Menu.Item key="/">
        <Link to="/">Home</Link>
      </Menu.Item>

      <Menu.Item key="/logout">
        <Link to="/logout">Logout</Link>
      </Menu.Item>
    </Menu>
  );
};

const UnauthenticatedMenu: React.FC<MenuProps> = (props) => {
  return (
    <Menu {...props}>
      <Menu.Item key="/">
        <Link to="/">Home</Link>
      </Menu.Item>

      <Menu.Item key="/login">
        <Link to="/login">Login</Link>
      </Menu.Item>

      <Menu.Item key="/register">
        <Link to="/register">Register</Link>
      </Menu.Item>
    </Menu>
  );
};

const Navigation: React.FC = () => {
  const { authenticated } = React.useContext(UserContext);
  const history = useHistory();

  return authenticated ?
    <AuthenticatedMenu theme="dark" mode="horizontal" defaultSelectedKeys={[history.location.pathname]} style={{ lineHeight: '64px' }} /> :
    <UnauthenticatedMenu theme="dark" mode="horizontal" defaultSelectedKeys={[history.location.pathname]} style={{ lineHeight: '64px' }} />;
};

export default Navigation;
