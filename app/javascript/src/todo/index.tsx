import React from 'react'
import { BrowserRouter, Switch, Route, Link } from 'react-router-dom';
import { Layout } from 'antd';
import 'antd/dist/antd.css';

import AppProviders from './context';
import Navigation from './components/Navigation';
import UserRegister from './components/UserRegister';
import UserLogin from './components/UserLogin';
import Home from './components/Home';

const App: React.FC = () => {
  return (
    <BrowserRouter>
      <AppProviders>
        <Layout>
          <Layout.Header>
            <Navigation />
          </Layout.Header>

          <Layout.Content style={{ marginTop: 24, padding: '0 64px' }}>
            <div style={{ background: '#fff', padding: 24, minHeight: 280 }}>
              <Switch>
                <Route path="/register"><UserRegister /></Route>
                <Route path="/login"><UserLogin /></Route>
                <Route path="/todos"><UserRegister /></Route>
                <Route path="/"><Home /></Route>
              </Switch>
            </div>
          </Layout.Content>

          <Layout.Footer>Zack Hovatter &copy; Copyright 2019</Layout.Footer>
        </Layout>
      </AppProviders>
    </BrowserRouter>
  )
};

export default App;
