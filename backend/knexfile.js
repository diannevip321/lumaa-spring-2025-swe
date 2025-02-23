// Update with your config settings.

/**
 * @type { Object.<string, import("knex").Knex.Config> }
 */
require('dotenv').config(); // Load environment variables

module.exports = {
  development: {
    client: "pg",  // Use PostgreSQL
    connection: process.env.DATABASE_URL,  // Use the connection string from .env
    pool: {
      min: 2,
      max: 10
    },
    migrations: {
      directory: "./migrations",
      tableName: "knex_migrations"
    }
  },

  staging: {
    client: "pg",
    connection: {
      database: "lumaataskdb",
      user: "postgres",
      password: process.env.DB_PASSWORD  // Secure password handling
    },
    pool: {
      min: 2,
      max: 10
    },
    migrations: {
      tableName: "knex_migrations"
    }
  },

  production: {
    client: "pg",
    connection: {
      database: "lumaataskdb",
      user: "postgres",
      password: process.env.DB_PASSWORD
    },
    pool: {
      min: 2,
      max: 10
    },
    migrations: {
      tableName: "knex_migrations"
    }
  }
};
