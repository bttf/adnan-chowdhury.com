import fs from 'fs';
import path from 'path';
import express from 'express';
import React from 'react';
import { renderToString } from 'react-dom/server';
import { StaticRouter } from 'react-router-dom';
import { ServerStyleSheet } from 'styled-components';
import { upperFirst } from 'lodash';
import App from './App';

const stylesheet = new ServerStyleSheet();
const assets = require(process.env.RAZZLE_ASSETS_MANIFEST);
const server = express();

const getBlogPosts = () => {
  const blogPostsPath = path.resolve(process.env.RAZZLE_PUBLIC_DIR, 'blog_posts');
  let blogPosts = fs.readdirSync(blogPostsPath);

  blogPosts = blogPosts.map(post => {
    const fsStat = fs.statSync(path.resolve(blogPostsPath, post));
    const createdAt = fsStat.ctime;
    const modifiedAt = fsStat.mtime;
    const title = upperFirst(post.split('.')[0].replace(/_/g, ' '));

    return {
      title,
      createdAt,
      modifiedAt,
      filename: post,
    };
  }).sort((a, b) => {
    return b.createdAt > a.createdAt ? 1 : b.createdAt === a.createdAt ? 0 : -1;
  });

  return blogPosts;
};

let styleTags;
try {
  stylesheet.collectStyles(
    <App />
  );
  styleTags = stylesheet.getStyleTags();
} catch(e) {
  console.error(e);
} finally {
  stylesheet.seal();
}

server.disable('x-powered-by');

server.use(express.static(process.env.RAZZLE_PUBLIC_DIR));

server.get('/*', (req, res) => {
  const context = {};
  const blogPosts = getBlogPosts();
  const markup = renderToString(
    <StaticRouter context={context} location={req.url}>
      <App blogPosts={blogPosts} />
    </StaticRouter>
  );

  // context.url will contain the URL to redirect to if a <Redirect> was used
  if (context.url) {
    res.redirect(context.url);
  } else {
    res.status(200).send(
      `<!doctype html>
    <html lang="">
    <head>
        <meta http-equiv="X-UA-Compatible" content="IE=edge" />
        <meta charset="utf-8" />
        <title>serious shit</title>
        <meta name="viewport" content="width=device-width, initial-scale=1">
        <style>
          html,
          body {
            margin: 0;
            padding: 0;
            font-size: 100%;
          }
          body {
            font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, Helvetica, Arial, sans-serif, "Apple Color Emoji", "Segoe UI Emoji", "Segoe UI Symbol";
          }
        </style>
        ${styleTags}
        <script>
          window.blogPosts = ${JSON.stringify(blogPosts)};
        </script>
        ${
          assets.client.css
            ? `<link rel="stylesheet" href="${assets.client.css}">`
            : ''
        }
        ${
          process.env.NODE_ENV === 'production'
            ? `<script src="${assets.client.js}" defer></script>`
            : `<script src="${assets.client.js}" defer crossorigin></script>`
        }
    </head>
    <body>
        <div id="root">${markup}</div>
    </body>
</html>`
    );
  }
});

export default server;
