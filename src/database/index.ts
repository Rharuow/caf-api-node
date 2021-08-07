import { createConnection } from "typeorm";

require("dotenv").config()

createConnection({
    url: process.env.DATABASE_URL,
    type: 'postgres',
    // entities: process.env.TYPEORM_ENTITIES,
    synchronize: true,
    extra: {
      ssl: true,
    },
  });
