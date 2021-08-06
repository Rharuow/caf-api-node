require("dotenv").config();

console.log("TYPEORM_CONNECTION = ", process.env.TYPEORM_CONNECTION);
console.log("TYPEORM_HOST = ", process.env.TYPEORM_HOST);
console.log("TYPEORM_PORT = ", process.env.TYPEORM_PORT);
console.log("TYPEORM_USERNAME = ", process.env.TYPEORM_USERNAME);
console.log("TYPEORM_PASSWORD = ", process.env.TYPEORM_PASSWORD);
console.log("TYPEORM_DATABASE = ", process.env.TYPEORM_DATABASE);
console.log("TYPEORM_SYNCHRONIZE = ", process.env.TYPEORM_SYNCHRONIZE);
console.log("TYPEORM_MIGRATIONS_DIR = ", process.env.TYPEORM_MIGRATIONS_DIR);
console.log("TYPEORM_ENTITIES_DIR = ", process.env.TYPEORM_ENTITIES_DIR);
console.log("TYPEORM_ENTITIES = ", process.env.TYPEORM_ENTITIES);
console.log("TYPEORM_MIGRATIONS = ", process.env.TYPEORM_MIGRATIONS);

export default {
  url: "",
  type: process.env.TYPEORM_CONNECTION,
  host: process.env.TYPEORM_HOST,
  port: process.env.TYPEORM_PORT,
  username: process.env.TYPEORM_USERNAME,
  password: process.env.TYPEORM_PASSWORD,
  database: process.env.TYPEORM_DATABASE,
  synchronize: process.env.TYPEORM_SYNCHRONIZE,
  logging: false,
  cli: {
    migrationsDir: process.env.TYPEORM_MIGRATIONS_DIR,
    entitiesDir: process.env.TYPEORM_ENTITIES_DIR,
  },
  entities: [process.env.TYPEORM_ENTITIES],
  migrations: [process.env.TYPEORM_MIGRATIONS],
};
