const express = require('express');
const bodyParser = require('body-parser');
const routes = require('./routes.js');

const app = express();

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

routes(app);

const server = app.listen(3000, () => {
  console.log('App running on', server.address().port);
  console.log('hello world');
});
