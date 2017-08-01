const express = require('express');
const parser = require('body-parser');
const db = require('./database/db.js');
const axios = require('axios');

app = express();

app.use(parser.urlencoded({extended: true}));
app.use(parser.json());

app.use(express.static(__dirname + '/client-react'));


app.get('/users', function(req, res) {
  console.log('Server: receievd a get to /users')
  console.log('Server: req.body:', req.body);
  db.searchUser(req.body)
    .then( (result) => {res.status(200).send(result) })
    .catch( err => {console.log('Server: GET:', err)});
})





let port = false || 3000;

app.listen(port, function () {
  console.log(`Server: listening on ${port}`);
});