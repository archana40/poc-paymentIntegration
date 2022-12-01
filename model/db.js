let Sequelize = require("sequelize");
require("dotenv").config();
const ENV = process?.env
const sequelize = new Sequelize(
  ENV.DBNAME,
  ENV.DBUSERNAME,
  ENV.DBPASSWORD,
  {
    host: ENV.DBHOST,
    dialect: "postgres",
    operatorsAliases: 0,
    logging: false,
    reconnect: {
      max_retries: 5,
      onRetry: function (count) {
        console.log("connection lost, trying to reconnect (" + count + ")");
      },
    },
    pool: {
      max: 5,
      min: 0,
    },
  }
);
const db = {
  sequelize,
  Sequelize,
  Subscriptions: require("../model/payment")(sequelize, Sequelize),
};

module.exports = db;
