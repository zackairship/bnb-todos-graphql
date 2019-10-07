// Run this example by adding <%= javascript_pack_tag 'todo' %> to the head of your layout file,
// like app/views/layouts/application.html.erb. All it does is render <div>Hello React</div> at the bottom
// of the page.

import React from 'react';
import ReactDOM from 'react-dom';
import Todo from '../src/todo';

document.addEventListener('DOMContentLoaded', () => {
  ReactDOM.render(
    <Todo />,
    document.body.appendChild(document.createElement('div')),
  )
})
