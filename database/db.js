const Sequelize = require('sequelize');
const dataToSeed = require('./seeddata.json')
// console.log('Data to Seed: ', dataToSeed);

const db = new Sequelize ('database', 'username', 'password', {
  host: 'localhost',
  dialect: 'sqlite',
  pool: {
    max: 5,
    min: 0,
    idle: 10000
  },
  storage: './database/database.sqlite'
});


const users = db.define('users', {
  name: { type: Sequelize.TEXT, unique: true},
  maxhitpoints: { type: Sequelize.INTEGER },
  attackpower: { type: Sequelize.INTEGER },
  armor: { type: Sequelize.INTEGER },
  attackrate: { type: Sequelize.INTEGER }
})

db.authenticate()
  .then(() => {
    console.log('Connection has been established successfully.');
  })
  .catch(err => {
    console.error('Unable to connect to the database:', err);
  }).then(

// removed { force: true } from within .sync. was causing errors.
    users.sync().then(dataToSeed.map(dataEntry => {
      console.log('dataEntry in .map:', dataEntry);
      return users.create({
          name: dataEntry.name,
          maxhitpoints: dataEntry.maxhitpoints,
          attackpower: dataEntry.attackpower,
          armor: dataEntry.armor,
          attackrate: dataEntry.attackrate
        }).catch((error) => {
          console.log('already exists!')})
    }))

    // users.sync().then(dataToSeed.map(dataEntry => {
    //   return users.findOrCreate({
    //     where: {name: dataEntry.name},
    //     defaults: {
    //       name: dataEntry.name,
    //       hitpoints: dataEntry.hitpoints,
    //       attackpower: dataEntry.attackpower,
    //       armor: dataEntry.armor
    //     }}).spread((user, created) => {
    //       console.log(user.get({
    //         plain: true
    //       }))
    //       console.log(created)
    //       })
    // }))

  );

const searchUser = function(enteredName, cb) {
  console.log('DB: searchUser: invoked for', enteredName);
  users.findAll({where: {name: enteredName}})
    .catch(err => { console.log('Error in searchUser:', err); })
    .then((result) => {
      console.log('DB: query result:', result);
      cb(null, result);
    });
}

const insertUser = function(enteredChar, cb) {
  console.log('DB: insertUser: invoked for', enteredChar);
  users.create(enteredChar)
    .catch(err => { console.log('Error in insertUser:', err); })
    .then((result) => {
      console.log('DB: insert:', result);
      cb(null, result);
    });
}


module.exports.db = db;
module.exports.users = users;
module.exports.searchUser = searchUser;
module.exports.insertUser = insertUser;
