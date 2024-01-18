import { Kysely, PostgresDialect } from "kysely";
import { Pool } from "pg";
import { DB } from "kysely-codegen";

const dialect = new PostgresDialect({
  pool: new Pool({
    connectionString: Bun.env.DATABASE_URL,
  }),
});

const db = new Kysely<DB>({
  dialect,
});

export default db;
