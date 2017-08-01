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
  // console.log('Server: req.body:', req.body);
  // console.log('Server: req.params:', req.params);
  console.log('Server: req.query:', req.query);
  db.searchUser(req.query.name);
    // .then( (result) => {res.status(200).send(result) })
    // .catch( err => {console.log('Server: GET:', err)});
  // res.status(200).send('ok');
  res.status(200).send('ok');
})





let port = false || 3000;

app.listen(port, function () {
  console.log(`Server: listening on ${port}`);
});
