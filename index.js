const express = require('express');
const parser = require('body-parser');
const Promise = require('bluebird');
const db = require('./database/db.js');
const searchUserPromisified = Promise.promisify(db.searchUser)

const axios = require('axios');

app = express();

app.use(parser.urlencoded({extended: true}));
app.use(parser.json());

app.use(express.static(__dirname + '/client-react'));


app.get('/users', function(req, res) {
  console.log('Server: receievd a get to /users')
  // console.log('Server: req.body:', req.body);
  // console.log('Server: req.params:', req.params);
  // console.log('Server: req.query:', req.query);
  db.searchUser(req.query.name, (err, result) => {
    // console.log('Server: database query result:', result);
    if (err) { err => (console.log('Server: err in querying db:', err))}
    else { res.status(200).send(result); }
  });

})





let port = false || 3000;

app.listen(port, function () {
  console.log(`Server: listening on ${port}`);
});
