// const mysql = require("mysql");

const mysql = require("mysql2");

require("dotenv").config();
console.log("process.env.DB_PASS ", process.env.DB_PASS);

const pool = mysql.createPool({
  port: process.env.DB_PORT,
  host: process.env.DB_HOST,
  password: "0Gloadmin123#$",
  database: process.env.MYSQL_DB,
  user: process.env.DB_USER,
  // connectionLimit: 500,
  waitForConnections: true,
  queueLimit: 0,
});

module.exports = pool;
