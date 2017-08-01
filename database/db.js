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
  hitpoints: { type: Sequelize.INTEGER },
  attackpower: { type: Sequelize.INTEGER },
  armor: { type: Sequelize.INTEGER },
})

db.authenticate()
  .then(() => {
    console.log('Connection has been established successfully.');
  })
  .catch(err => {
    console.error('Unable to connect to the database:', err);
  }).then(

// removed { force: true } from within .sync. was causing errors.
    users.sync({ force: true }).then(dataToSeed.map(dataEntry => {
      console.log('dataEntry in .map:', dataEntry);
      return users.create({
          name: dataEntry.name,
          hitpoints: dataEntry.hitpoints,
          attackpower: dataEntry.attackpower,
          armor: dataEntry.armor
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

module.exports.db = db;
module.exports.users = users;
