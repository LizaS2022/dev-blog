// require the npm package
const Sequelize = require('sequelize');
// can hide sensitive info
require('dotenv').config();

let sequelize;

// this if statement part is required in order to deploy the adatabase to the internet
if (process.env.JAWSDB_URL) {
  sequelize = new Sequelize(process.env.JAWSDB_URL);
} else {
    // THIE IS THE NORMAL SEQUELIZE CALL TO CONNECT TO THE DATABASE IN THE COMPUTER.
  sequelize = new Sequelize(
    process.env.DB_NAME,
    process.env.DB_USER,
    "",
    {
      host: 'localhost',
      dialect: 'mysql',
      port: 3306  //WHERE THE DATABSE LIVES IN THE COMPUTER
    }
  );
}

module.exports = sequelize;