require("dotenv")
module.exports = {
  type: "postgres",
  url: process.env.DATABASE_URL,
  // "host": process.env.HOST,
  // "port": process.env.PORTDATA,
  // "username": process.env.USERDATA,
  // "password": process.env.PASSWORD,
  // "database": process.env.DATABASE,
  synchronize: true,
  ssl: true,
  extra: {
    ssl: {
      rejectUnauthorized: false
    }
  },
  entities: [
    "dist/entity/**/*.js"
  ],
  migrations: [
    "dist/migration/**/*.js"
  ],
  subscribers: [
    "dist/subscriber/**/*.js"
  ],
  cli: {
    entitiesDir: "dist/entity",
    migrationsDir: "dist/migration",
    subscribersDir: "dist/subscriber"
  }
}
