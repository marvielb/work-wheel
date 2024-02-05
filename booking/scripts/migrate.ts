import { FileMigrationProvider, Migrator, sql } from 'kysely';
import { promises as fs } from 'fs';
import path from 'path';
import db from 'db';

const migrationFilePath = path.join(
  path.dirname(new URL(import.meta.url).pathname),
  '..',
  'migrations'
);

const migrator = new Migrator({
  db,
  provider: new FileMigrationProvider({
    fs,
    path,
    migrationFolder: migrationFilePath,
  }),
});

if (process.argv[2]) {
  await sql`DO $$ 
DECLARE 
    table_to_drop text; 
BEGIN 
    FOR table_to_drop IN (SELECT table_name FROM information_schema.tables WHERE table_schema = 'public') 
    LOOP 
        EXECUTE 'DROP TABLE IF EXISTS ' || table_to_drop || ' CASCADE'; 
    END LOOP; 
END $$;`.execute(db);
}

const result = await migrator.migrateToLatest();
console.log(result);
