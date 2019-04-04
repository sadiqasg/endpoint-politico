const express = require('express');
const bodyParser = require('body-parser');
const fs = require('fs');

const offices = require('./controllers/offices');

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

app.get(`${apiVersion1}/offices`, (req, res) => {
  let offices = offices.getAll();
  res.send(offices);
});

app.listen(port, () => console.log(`Listening on port ${port}`));