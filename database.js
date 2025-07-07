const { Pool } = require("pg");
require("dotenv").config();

const pool = new Pool({
  connectionString: process.env.DATABASE_URL,
  idleTimeoutMillis: 10000,
  connectionTimeoutMillis: 30000,
  options: "-c search_path=chatbot",
});

module.exports = pool;
