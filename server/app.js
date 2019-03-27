const express = require('express');
const bodyParser = require('body-parser');
const fs = require('fs');

const routes = require('./routes');
const app = express();
const port = 3000 || process.env.PORT;
const apiVersion1 = '/api/v1';

app.use(bodyParser.urlencoded({extended: true}));

app.get('/', (req, res) => {
  res.send('navigate to /api/v1');
});

app.get(apiVersion1, (req, res) => {
  res.send('api version 1 is active');
});

app.post(`${apiVersion1}/posts`, (req, res) => {
});

app.get(`${apiVersion1}/posts`, (req, res) => {
  let posts = routes.test();
  res.send(posts);
});

app.listen(port, () => console.log(`Listening on port ${port}`));