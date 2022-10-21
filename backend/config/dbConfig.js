require("dotenv").config();

module.exports = {
  HOST: process.env.DB_HOST,
  USER: process.env.DB_USER,
  PASSWORD: process.env.DB_RAJ_PASSWORD,
  DB: process.env.DB_DATABASE,
  dialect: process.env.DB_DIALECT,

  pool: {
    max: 50,
    min: 0,
    acquire: 1200000,
    idle: 1000000,
  },
};
