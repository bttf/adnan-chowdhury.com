import App from './App';
import { BrowserRouter } from 'react-router-dom';
import React from 'react';
import { hydrate } from 'react-dom';

const blogPosts = window.blogPosts;

hydrate(
  <BrowserRouter>
    <App blogPosts={blogPosts} />
  </BrowserRouter>,
  document.getElementById('root')
);

if (module.hot) {
  module.hot.accept();
}
