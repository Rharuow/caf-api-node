import { createConnection, getConnection } from "typeorm";
require("dotenv").config({
  path: ".env.test",
})

const connection = {
  async create() {
    await createConnection();
    await getConnection().runMigrations()
  },

  async close() {
    await getConnection().close();
  },

  async clear() {
    const connection = getConnection();
    const entities = connection.entityMetadatas;

    entities.forEach(async (entity) => {
      const repository = connection.getRepository(entity.name);

      await repository.query(`DELETE FROM ${entity.tableName}`);
    });
  },
};

beforeAll(async () => {
  console.log("CREATE")
  await connection.create();
});


beforeEach(async () => {
  console.log("CLEAR")
  await connection.clear();
});

afterAll(async () => {
  console.log("CLOSE")
  await connection.close().catch(err => console.log(err));
});