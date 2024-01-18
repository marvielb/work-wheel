import {
  FileMigrationProvider,
  Kysely,
  Migrator,
  PostgresDialect,
} from "kysely";
import { Pool } from "pg";
import { promises as fs } from "fs";
import path from "path";

const dialect = new PostgresDialect({
  pool: new Pool({
    database: "shuttle_catalog",
    host: "localhost",
    user: "work_wheel",
    password: "secret",
    port: 5432,
    max: 10,
  }),
});

// Database interface is passed to Kysely's constructor, and from now on, Kysely
// knows your database structure.
// Dialect is passed to Kysely's constructor, and from now on, Kysely knows how
// to communicate with your database.
const migrationFilePath = path.join(
  path.dirname(new URL(import.meta.url).pathname),
  "..",
  "migrations",
);

export const db = new Kysely<any>({
  dialect,
});

const migrator = new Migrator({
  db,
  provider: new FileMigrationProvider({
    fs,
    path,
    migrationFolder: migrationFilePath,
  }),
});

const result = await migrator.migrateToLatest();
console.log(result);
