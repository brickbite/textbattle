const express = require('express');
const parser = require('body-parser');
const db = require('./database/db.js');

app = express();

app.use(parser.urlencoded({extended: true}));
app.use(parser.json());

app.use(express.static(__dirname + '/client-react'));

let port = false || 3000;

app.listen(port, function () {
  console.log(`Server: listening on ${port}`);
});
