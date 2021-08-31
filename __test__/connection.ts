import { createConnection, getConnection } from "typeorm";
require("dotenv").config({
  path: ".env.test",
})

const connection = {
  async create() {
    await createConnection({
      name: "test",
      type: "postgres",
      host: "localhost",
      port: 5432,
      username: "postgres",
      password: "",
      database: "caf_api_node_test",
      cli: {
        migrationsDir: process.env.TYPEORM_MIGRATIONS_DIR,
        entitiesDir: process.env.TYPEORM_ENTITIES_DIR,
      },
      entities: [process.env.TYPEORM_ENTITIES],
      migrations: [process.env.TYPEORM_MIGRATIONS],
    });
  },

  async close() {
    await getConnection("test").close();
  },

  async clear() {
    const connection = getConnection("test");
    console.log(getConnection("test"))
    const entities = connection.entityMetadatas;

    entities.forEach(async (entity) => {
      const repository = connection.getRepository(entity.name);
      await repository.query(`DELETE FROM ${entity.tableName}`);
    });
  },
};

beforeAll(async () => {
  await connection.create();
});

afterAll(async () => {
  await connection.close();
});

beforeEach(async () => {
  await connection.clear();
});
