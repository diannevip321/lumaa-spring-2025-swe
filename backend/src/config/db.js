/**
 * Database configuration
 * This file establishes a connection to the PostgreSQL database using the `pg` package.
 * It reads database credentials from the `.env` file.
 */

const { Pool } = require('pg');
require('dotenv').config();

const pool = new Pool({
    connectionString: process.env.DATABASE_URL,
});

module.exports = pool;