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
    const connection = getConnection();
    const entities = connection.entityMetadatas;

    entities.forEach(async (entity) => {
      const repository = connection.getRepository(entity.name);
      console.log("repository = ", entity.name)

      await repository.query(`DELETE FROM ${entity.tableName}`);
    });
    await getConnection().close();
  },
};

beforeAll(async () => {
  console.log("CREATE")
  await connection.create()
  
});

afterAll(async () => {
  console.log("CLOSE")
  await connection.close()
});