// Run this example by adding <%= javascript_pack_tag 'hello_react' %> to the head of your layout file,
// like app/views/layouts/application.html.erb. All it does is render <div>Hello React</div> at the bottom
// of the page.

import React from 'react'
import ReactDOM from 'react-dom'
import { BrowserRouter, Switch, Route, Link } from 'react-router-dom';
import { Layout } from 'antd';
import 'antd/dist/antd.css';

import AppProviders from './todo/context';
import Navigation from './todo/components/Navigation';
import UserRegister from './todo/components/UserRegister';
import Home from './todo/components/Home';

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
                <Route path="/login"><UserRegister /></Route>
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

document.addEventListener('DOMContentLoaded', () => {
  ReactDOM.render(
    <App />,
    document.body.appendChild(document.createElement('div')),
  )
})
