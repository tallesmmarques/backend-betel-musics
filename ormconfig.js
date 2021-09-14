require("dotenv")
module.exports = {
  "type": "postgres",
  "host": process.env.DATABASE_URL,
  "port": process.env.PORTDATA,
  "username": process.env.USERDATA,
  "password": process.env.PASSWORD,
  "database": process.env.DATABASE,
  "synchronize": true,
  "logging": false,
  "entities": [
    "dist/entity/**/*.js"
  ],
  "migrations": [
    "dist/migration/**/*.js"
  ],
  "subscribers": [
    "dist/subscriber/**/*.js"
  ],
  "cli": {
    "entitiesDir": "dist/entity",
    "migrationsDir": "dist/migration",
    "subscribersDir": "dist/subscriber"
  }
}
