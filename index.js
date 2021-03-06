const express = require('express');
const parser = require('body-parser');
const db = require('./database/db.js');

const axios = require('axios');

app = express();

app.use(parser.urlencoded({extended: true}));
app.use(parser.json());

app.use(express.static(__dirname + '/client-react'));


app.get('/users', function(req, res) {
  console.log('Server: receievd GET to /users');
  // console.log('Server: req.body:', req.body);
  // console.log('Server: req.params:', req.params);
  console.log('Server: req.query:', req.query);
  db.searchUser(req.query.name, (err, result) => {
    // console.log('Server: database query result:', result);
    if (err) { err => (console.log('Server: err in querying db:', err))} // need to do error handling in terms of a response to client
    else { console.log('Server: query from DB result:', result);
      res.send(result); }
  });

})

app.post('/users', function(req, res) {
  console.log('Server: received POST to /users');
  console.log('Server: req.body:', req.body);
  // console.log('Server: req.params:', req.params);
  // console.log('Server: req.query:', req.query);
  db.insertUser(req.body, (err, result) => {
    // console.log('Server: database query result:', result);
    if (err) { err => (console.log('Server: err in inserting to db:', err))} // need to do error handling in terms of a response to client
    else { console.log('Server: insert to DB result:', result);
      res.status(201).send(result); }
  });
})



let port = false || 3000;

app.listen(port, function () {
  console.log(`Server: listening on ${port}`);
});
