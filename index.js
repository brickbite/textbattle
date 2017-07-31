const express = require('express');
const Sequelize = require('sequelize');
const parser = require('body-parser');

app = express();

app.use(parser.urlencoded({extended: true}));
app.use(parser.json());

app.use(express.static(__dirname + '/client'));

let port = false || 3000;

app.listen(port, function () {
  console.log(`Server: listening on ${port}`);
});
